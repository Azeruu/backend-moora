import Hasil from "../models/HasilModel.js";
import User from "../models/UserModel.js";
import NilaiAlternatif from "../models/NilaiAlternatifModel.js";
import Alternatif from "../models/AlternatifModel.js";
import Kriteria from "../models/KriteriaModel.js";
import { Op } from "sequelize";

//get Hasil
export const getHasil = async (req, res) => {
  try {
    const response = await Hasil.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "password"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get Hasil By ID
export const getHasilById = async (req, res) => {
  try {
    const hasil = await Hasil.findOne({
      where: [
        {
          id: req.params.id,
        },
      ],
    });
    if (!hasil) return res.status(404).json({ msg: "Data Tidak Diteukan" });
    let response;
    if (req.role === "admin") {
      response = await Hasil.findOne({
        include: [
          {
            model: User,
            atributes: ["username", "password"],
          },
        ],
      });
    } else {
      response = await Hasil.findOne({
        where: {
          [Op.and]: [{ id: hasil.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// CREATE HASIL
export const createHasil = async (req, res) => {
  try {
    const nilai_alternatif = await NilaiAlternatif.findAll();
    const data_alternatif = await Alternatif.findAll();

    const groupedData = {};
    nilai_alternatif.forEach(({ nama_alternatif, nama_kriteria, nilai_fuzzy }) => {
        groupedData[nama_kriteria] = groupedData[nama_kriteria] || [];
        groupedData[nama_kriteria].push({ nama_alternatif, nilai_fuzzy });
    });

    const squareRootValues = {};
    for (const [nama_kriteria, data] of Object.entries(groupedData)) {
        const totalSquaredValue = data.reduce((total, { nilai_fuzzy }) => total + Math.pow(nilai_fuzzy, 2), 0);
        squareRootValues[nama_kriteria] = Math.sqrt(totalSquaredValue);
    }

    // Nilai Fuzzy Dibagi square root 
    const dividedValues = {};
    for (const [nama_kriteria, data] of Object.entries(groupedData)) {
        const squareRootValue = squareRootValues[nama_kriteria];
        dividedValues[nama_kriteria] = data.map(({ nama_alternatif, nilai_fuzzy }) => ({
            nama_alternatif,
            nilai_fuzzy: nilai_fuzzy / squareRootValue
        }));
    }

    const bobotKriteria = {};
    const dataKriteria = await Kriteria.findAll();
    dataKriteria.forEach(({ nama_kriteria, bobot_kriteria }) => {
        bobotKriteria[nama_kriteria] = bobot_kriteria;
    });

    // Perkalian dengan Bobot
    const multipliedValues = {};
    for (const [nama_kriteria, data] of Object.entries(dividedValues)) {
        const bobot = bobotKriteria[nama_kriteria];
        multipliedValues[nama_kriteria] = data.map(({ nama_alternatif, nilai_fuzzy }) => ({
            nama_alternatif,
            nilai_fuzzy: nilai_fuzzy * bobot
        }));
    }

    const summedValues = {};
    for (const [nama_kriteria, data] of Object.entries(multipliedValues)) {
        data.forEach(({ nama_alternatif, nilai_fuzzy }) => {
            summedValues[nama_alternatif] = 
            (summedValues[nama_alternatif] || 0) + (nilai_fuzzy * (nama_kriteria === "Rata - Rata Nilai Rapot" || nama_kriteria === "Usia" ? 1 : -1));
        });
    }

    // console.log(summedValues);
    try {
      // Menyimpan hasil penjumlahan per alternatif ke dalam tabel Hasil
      for (const [nama_alternatif, nilai_fuzzy] of Object.entries(summedValues)) {
        // Cari data dalam tabel Hasil dengan nama_alternatif dan jalur_pendaftaran yang sama
        const existingData = await Hasil.findOne({where: {nama_alternatif,}});
        // Jika data sudah ada, lewati proses penambahan data baru
        if (existingData) continue;
        // Dapatkan jalur_pendaftaran dari tabel data_alternatif
        const jalur_pendaftaran = data_alternatif.find(({ nama_alternatif: nama }) => nama === nama_alternatif)?.nama_jalur;
        const dataAlternatifId = data_alternatif.find(({ nama_alternatif: nama }) => nama === nama_alternatif)?.id;
        const jalurId = data_alternatif.find(({ nama_alternatif: nama }) => nama === nama_alternatif)?.jalurId;
        // Jika tidak ada data yang sama, masukkan hasil ke dalam tabel Hasil
        await Hasil.create({
            nama_alternatif,
            jalur_pendaftaran,
            nilai: nilai_fuzzy,
            userId: req.userId,
            dataAlternatifId,
            jalurId
        });
      }
    } catch (error) {
        console.error("Gagal menginput data hasil kedalam tabel Hasil", error);
        // Tangani kesalahan jika penyisipan gagal
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
      }
    // Beri respons dengan pesan sukses setelah semua catatan dimasukkan
    res.status(201).json({ msg: "Data Hasil Berhasil Diinput atau Diperbarui" });
  } catch (error) {
    console.error("Error:", error);
    // Tangani kesalahan jika pengambilan catatan gagal
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};


//UPDATE Hasil
export const updateHasil = async (req, res) => {
  try {
    const nilai_alternatif = await NilaiAlternatif.findAll();
    const data_alternatif = await Alternatif.findAll();
// console.log(data_alternatif)

// Untuk mengelompokkan data
    const groupedData = {};
    nilai_alternatif.forEach(({ nama_alternatif, nama_kriteria, nilai_fuzzy }) => {
      groupedData[nama_kriteria] = groupedData[nama_kriteria] || [];
      groupedData[nama_kriteria].push({ nama_alternatif, nilai_fuzzy });
    });

    // untuk menghitung nilai fuzzy
    const squareRootValues = {};
    for (const [nama_kriteria, data] of Object.entries(groupedData)) {
      const totalSquaredValue = data.reduce((total, { nilai_fuzzy }) => total + Math.pow(nilai_fuzzy, 2), 0);
      squareRootValues[nama_kriteria] = Math.sqrt(totalSquaredValue);
    }

    const dividedValues = {};
    for (const [nama_kriteria, data] of Object.entries(groupedData)) {
      const squareRootValue = squareRootValues[nama_kriteria];
      dividedValues[nama_kriteria] = data.map(({ nama_alternatif, nilai_fuzzy }) => ({
        nama_alternatif,
        nilai_fuzzy: nilai_fuzzy / squareRootValue
      }));
    }

    const bobotKriteria = {};
    const dataKriteria = await Kriteria.findAll();
    dataKriteria.forEach(({ nama_kriteria, bobot_kriteria }) => {
      bobotKriteria[nama_kriteria] = bobot_kriteria;
    });

    const multipliedValues = {};
    for (const [nama_kriteria, data] of Object.entries(dividedValues)) {
      const bobot = bobotKriteria[nama_kriteria];
      multipliedValues[nama_kriteria] = data.map(({ nama_alternatif, nilai_fuzzy }) => ({
        nama_alternatif,
        nilai_fuzzy: nilai_fuzzy * bobot
      }));
    }

    const summedValues = {};
    for (const [nama_kriteria, data] of Object.entries(multipliedValues)) {
      data.forEach(({ nama_alternatif, nilai_fuzzy }) => {
        summedValues[nama_alternatif] = (summedValues[nama_alternatif] || 0) + (nilai_fuzzy * (nama_kriteria === "Rata - Rata Nilai Rapot" || nama_kriteria === "Usia" ? 1 : -1));
      });
    }

    // console.log(summedValues);
      try {
        const idDataAlternatif = data_alternatif.map((alternatif) => alternatif.id);
        // Filter hasil yang tidak memiliki ID yang cocok dengan ID data alternatif
        const hasilYangTidakCocok = await Hasil.findAll({
            where: {
                dataAlternatifId: {
                    [Op.notIn]: idDataAlternatif // Filter hasil yang tidak ada di ID data alternatif
                }
            }
        });
        // Hapus hasil yang tidak cocok
        for (const hasil of hasilYangTidakCocok) {
            await hasil.destroy();
        }
        
        // Update hasil per alternatif ke dalam tabel Hasil
        for (const [nama_alternatif, nilai_fuzzy] of Object.entries(summedValues)) {
            // Temukan data Hasil yang sesuai dengan nama_alternatif
            const dataAlternatif = data_alternatif.find(({ nama_alternatif: nama }) => nama === nama_alternatif);
            if (dataAlternatif) {
                const dataAlternatifId = dataAlternatif.id;
                const hasil = await Hasil.findOne({ where: { dataAlternatifId } });
                if (hasil) {
                    // Dapatkan jalur_pendaftaran dari tabel data_alternatif
                    const jalur_pendaftaran = dataAlternatif.nama_jalur;
                    // Update nilai hasil
                    await hasil.update({
                      nama_alternatif,
                      nilai: nilai_fuzzy,
                      jalur_pendaftaran
                    });
                }
            }
        }
    } catch (error) {
      console.error("Gagal mengupdate data hasil di tabel Hasil", error);
      // Tangani kesalahan jika penyisipan gagal
      return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
    // Beri respons dengan pesan sukses setelah semua catatan dimasukkan
    res.status(200).json({ msg: "Data Hasil Berhasil Diupdate" });
  } catch (error) {
    console.error("Error:", error);
    // Tangani kesalahan jika pengambilan catatan gagal
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};


//HAPUS Hasil
export const deleteHasil = async (req, res) => {
  try {
    const hasil = await Hasil.findOne({
      where: {
        id:req.params.id
      },
    });
    if (!hasil) return res.status(404).json({ msg: "Data hasil tidak ditemukan" });
    if (req.role === "admin") {
      await Hasil.destroy({
        where: {
          id: hasil.id,
        },
      });
    } else {
      if (req.userId !== hasil.userId)
        return res.status(403).json({ msg: "Anda tidak memiliki akses" });
      await Hasil.destroy({
        where: {
          [Op.and]: [{ id: hasil.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Siswa Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

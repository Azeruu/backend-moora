import Hasil from "../models/HasilModel.js";
import User from "../models/UserModel.js";
import NilaiAlternatif from "../models/NilaiAlternatifModel.js";
import { Op } from "sequelize";
import AlternatifModel from "../models/AlternatifModel.js";

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
    // Ambil catatan terbaru dari nilai_alternatif dan data_alternatif
    const nilai_alternatif = await NilaiAlternatif.findAll({
      order: [['createdAt', 'DESC']],
    });

    const data_alternatif = await AlternatifModel.findAll({
      order: [['createdAt', 'DESC']],
    });

    // Buat set untuk melacak nama_alternatif yang sudah diproses
    const processedNamaAlternatif = new Set();

    // Iterasi melalui nilai_alternatif dan masukkan catatan ke dalam tabel Hasil
    for (const nilai of nilai_alternatif) {
      const namaAlternatif = nilai.nama_alternatif;

      // Cek apakah nama_alternatif sudah diproses sebelumnya
      if (!processedNamaAlternatif.has(namaAlternatif)) {
        const dataNilaiAlternatif = await NilaiAlternatif.findAll({
          where: { nama_alternatif: namaAlternatif }
        });

        // Jumlahkan nilai fuzzy dari data_nilai_alternatif
        let totalNilaiFuzzy = 0;
        dataNilaiAlternatif.forEach((data) => {
          totalNilaiFuzzy += data.nilai_fuzzy;
        });

        const dataAlternatif = data_alternatif.find(data => data.nama_alternatif === namaAlternatif);
        const jalurPendaftaran = dataAlternatif ? dataAlternatif.nama_jalur : null;

        try {
          // Masukkan catatan ke dalam tabel Hasil
          await Hasil.create({
            nama_alternatif: namaAlternatif,
            jalur_pendaftaran: jalurPendaftaran,
            nilai: totalNilaiFuzzy, // Masukkan total nilai fuzzy
            dataAlternatifId:dataAlternatif.id,
            userId:req.params.id,
            jalurId:dataAlternatif.jalurId
          });

          // Tandai nama_alternatif sebagai sudah diproses
          processedNamaAlternatif.add(namaAlternatif);
        } catch (error) {
          console.error("Error inserting record into Hasil table:", error);
          // Tangani kesalahan jika penyisipan gagal
          return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
        }
      }
    }

    // Beri respons dengan pesan sukses setelah semua catatan dimasukkan
    res.status(201).json({ msg: "Data Hasil Berhasil Diinput" });
  } catch (error) {
    console.error("Error:", error);
    // Tangani kesalahan jika pengambilan catatan gagal
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};





//UPDATE Hasil
export const updateHasil = async (req, res) => {
  try {
    const nilai_alternatif = await Hasil.findOne({
      where: {
        id : req.params.id
      },
    });

   // Bobot kriteria
      const bobotUmur = 0.2;
      const bobotJarak = 0.3;
      const bobotNilaiPkn = 0.1;
      const bobotNilaiBindo = 0.1;
      const bobotNilaiMtk = 0.1;
      const bobotNilaiIps = 0.1;
      const bobotNilaiIpa = 0.1;

      // Nilai Min dan Max dari Kriteria USIA
      const maxUsia = 13;
      const minUsia = 11;
      const maxJarak = 2;
      const minJarak = 0;

      // Nialai Min dan Max dari Rata-rata nilai MAPEL
      const maxNilaiPKN = 100;
      const minNilaiPKN = 50;
      const maxNilaiBINDO = 100;
      const minNilaiBINDO = 50;
      const maxNilaiMTK = 100;
      const minNilaiMTK = 50;
      const maxNilaiIPS = 100;
      const minNilaiIPS = 50;
      const maxNilaiIPA = 100;
      const minNilaiIPA = 50;
        
    if (rekap_nilai) {

      // Normalisasi nilai, umur dan jarak
      const normalizedUsia = (maxUsia - rekap_nilai.usia) / (maxUsia - minUsia);
      const normalizedJarak = (maxJarak - rekap_nilai.jarak) / (maxJarak - minJarak);
      const normalizedPKN = (rekap_nilai.avrg_nilai_pkn - minNilaiPKN) / (maxNilaiPKN - minNilaiPKN);
      const normalizedBINDO = (rekap_nilai.avrg_nilai_bindo - minNilaiBINDO) / (maxNilaiBINDO - minNilaiBINDO);
      const normalizedMTK = (rekap_nilai.avrg_nilai_mtk - minNilaiMTK) / (maxNilaiMTK - minNilaiMTK);
      const normalizedIPS = (rekap_nilai.avrg_nilai_ips - minNilaiIPS) / (maxNilaiIPS - minNilaiIPS);
      const normalizedIPA = (rekap_nilai.avrg_nilai_ipa - minNilaiIPA) / (maxNilaiIPA - minNilaiIPA);
      
      // Perhitungsn Skor Akhir
      const skor_akhir =
          bobotNilaiPkn * normalizedPKN +
          bobotNilaiBindo * normalizedBINDO +
          bobotNilaiMtk * normalizedMTK +
          bobotNilaiIps * normalizedIPS +
          bobotNilaiIpa * normalizedIPA +
          bobotJarak * normalizedJarak +
          bobotUmur * normalizedUsia;

          // const sortedRekapNilai = rekap_nilai2.sort((a, b) => a.skor_akhir - b.skor_akhir);
          // console.log(sortedRekapNilai);
          // const peringkat = sortedRekapNilai.findIndex(item => item.dataSiswaId === rekap_nilai.dataSiswaId) + 1;
          // console.log(peringkat);
          // console.log(skor_akhir);

        try {
          await Hasil.update({
            userId: req.userId,
            dataSiswaId: rekap_nilai.dataSiswaId,
            nama_lengkap: rekap_nilai.nama_lengkap,
            skor_akhir: skor_akhir,
          },{
            where:{
              dataSiswaId:rekap_nilai.dataSiswaId
          }});
          res.status(201).json({ msg: "Data Hasil Berhasil Diinput" });
        } catch (error) {
          res.status(500).json({ msg: error.message });
        }
    }else if(!rekap_nilai) {
      return res.status(404).json({ msg: "Data Rekap tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
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

import Hasil from "../models/HasilModel.js";
import User from "../models/UserModel.js";
import RekapNilai from "../models/RekapNilaiModel.js";
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
          uuid: req.params.id,
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
export const createHasil = async (req, res) => {
  try {
    const rekap_nilai = await RekapNilai.findOne({
      where: {
        userId: req.userId, // Mencocokkan userId dengan req.userId
      },
      order: [['createdAt', 'DESC']],
    });
    const rekap_nilai2 = await RekapNilai.findAll();

    // Bobot kriteria
      const bobotUmur = 0.2;
      const bobotJarak = 0.3;
      const bobotNilaiPkn = 0.1;
      const bobotNilaiBindo = 0.1;
      const bobotNilaiMtk = 0.1;
      const bobotNilaiIps = 0.1;
      const bobotNilaiIpa = 0.1;
        
    if (rekap_nilai) {
      // mengambil nilai min dan max dari masing masing kriteria
      const maxUsia = Math.max(...rekap_nilai2.map(rekap => Number(rekap.usia)));
      const minUsia = Math.min(...rekap_nilai2.map(rekap => Number(rekap.usia)));
      const maxJarak = Math.max(...rekap_nilai2.map(rekap => Number(rekap.jarak)));
      const minJarak = Math.min(...rekap_nilai2.map(rekap => Number(rekap.jarak)));
      const maxPkn = Math.max(...rekap_nilai2.map(rekap => Number(rekap.avrg_nilai_pkn)));
      const minPkn = Math.min(...rekap_nilai2.map(rekap => Number(rekap.avrg_nilai_pkn)));
      const maxBindo = Math.max(...rekap_nilai2.map(rekap => Number(rekap.avrg_nilai_bindo)));
      const minBindo = Math.min(...rekap_nilai2.map(rekap => Number(rekap.avrg_nilai_bindo)));
      const maxMtk = Math.max(...rekap_nilai2.map(rekap => Number(rekap.avrg_nilai_mtk)));
      const minMtk = Math.min(...rekap_nilai2.map(rekap => Number(rekap.avrg_nilai_mtk)));
      const maxIps = Math.max(...rekap_nilai2.map(rekap => Number(rekap.avrg_nilai_ips)));
      const minIps = Math.min(...rekap_nilai2.map(rekap => Number(rekap.avrg_nilai_ips)));
      const maxIpa = Math.max(...rekap_nilai2.map(rekap => Number(rekap.avrg_nilai_ipa)));
      const minIpa = Math.min(...rekap_nilai2.map(rekap => Number(rekap.avrg_nilai_ipa)));

      // Normalisasi nilai, umur dan jarak
      const normalizedUsia = (rekap_nilai.usia - minUsia) / (maxUsia - minUsia);
      const normalizedJarak = (maxJarak - rekap_nilai.jarak) / (maxJarak - minJarak);
      const normalizedPKN = (maxPkn - rekap_nilai.avrg_nilai_pkn) / (maxPkn - minPkn);
      const normalizedBINDO = (maxBindo - rekap_nilai.avrg_nilai_bindo) / (maxBindo - minBindo);
      const normalizedMTK = (maxMtk - rekap_nilai.avrg_nilai_mtk) / (maxMtk - minMtk);
      const normalizedIPS = (maxIps - rekap_nilai.avrg_nilai_ips) / (maxIps - minIps);
      const normalizedIPA = (maxIpa - rekap_nilai.avrg_nilai_ipa) / (maxIpa - minIpa);
      
      // Perhitungsn Skor Akhir
      const skor_akhir =
          bobotNilaiPkn * normalizedPKN +
          bobotNilaiBindo * normalizedBINDO +
          bobotNilaiMtk * normalizedMTK +
          bobotNilaiIps * normalizedIPS +
          bobotNilaiIpa * normalizedIPA +
          bobotJarak * normalizedJarak +
          bobotUmur * normalizedUsia;

          const sortedRekapNilai = rekap_nilai2.sort((a, b) => a.skor_akhir - b.skor_akhir);
          const peringkat = sortedRekapNilai.findIndex(item => item.dataSiswaId === rekap_nilai.dataSiswaId) + 1;
          console.log(peringkat);

        try {
          await Hasil.create({
            userId: req.userId,
            dataSiswaId: rekap_nilai.dataSiswaId,
            nama_lengkap: rekap_nilai.nama_lengkap,
            skor_akhir: skor_akhir,
            peringkat: peringkat,
          });
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

//UPDATE Hasil
export const updateHasil = async (req, res) => {
  try {
    const rekap_nilai = await RekapNilai.findOne({
      where: {
        userId: req.userId,
        dataSiswaId:req.params.id 
      },
    });

    // Bobot kriteria
      const bobotNilaiPkn = 0.1;
      const bobotNilaiBindo = 0.1;
      const bobotNilaiMtk = 0.1;
      const bobotNilaiIps = 0.1;
      const bobotNilaiIpa = 0.1;
      const bobotJarak = 0.3;
      const bobotUmur = 0.2;
        
    if (rekap_nilai) {
      // Normalisasi Kriteria
      const normalizedPKN = (rekap_nilai.avrg_nilai_pkn - 60) / (100 - 60);
      const normalizedBINDO = (rekap_nilai.avrg_nilai_bindo - 60) / (100 - 60);
      const normalizedMTK = (rekap_nilai.avrg_nilai_mtk - 60) / (100 - 60);
      const normalizedIPS = (rekap_nilai.avrg_nilai_ips - 60) / (100 - 60);
      const normalizedIPA = (rekap_nilai.avrg_nilai_ipa - 60) / (100 - 60);
      const normalizedDistance = rekap_nilai.jarak / 10;
      const normalizedUsia = (18 - rekap_nilai.usia) / 18; // Normalisasi usia

      // Perhitungsn Skor Akhir
      const skor_akhir =
          bobotNilaiPkn * normalizedPKN +
          bobotNilaiBindo * normalizedBINDO +
          bobotNilaiMtk * normalizedMTK +
          bobotNilaiIps * normalizedIPS +
          bobotNilaiIpa * normalizedIPA +
          bobotJarak * normalizedDistance +
          bobotUmur * normalizedUsia;

          // rekap_nilai.sort((a, b) => b.skor_akhir - a.skor_akhir);
      try {
        await Hasil.update({
          userId: req.userId,
          dataSiswaId: rekap_nilai.dataSiswaId,
          nama_lengkap: rekap_nilai.nama_lengkap,
          skor_akhir: skor_akhir,
          peringkat: 1
        },{
          where: {
            dataSiswaId: rekap_nilai.dataSiswaId,
          },
        });
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
        userId:req.userId
      },
    });
    if (!hasil) return res.status(404).json({ msg: "Data tidak ditemukan" });
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

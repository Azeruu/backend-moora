import RekapNilai from "../models/RekapNilaiModel.js";
import Nilai from "../models/NilaiModel.js";
import Siswa from "../models/SiswaModel.js";
import User from "../models/UserModel.js";
import { Op, Sequelize } from "sequelize";

//get RekapNilai
export const getNilai = async (req, res) => {
  try {
    const response = await RekapNilai.findAll({
      include: [
        {
          model: User,
          atributes: ["username", "password"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get RekapNilai By ID
export const getNilaiById = async (req, res) => {
  try {
    const nilai = await RekapNilai.findOne({
      where: [
        {
          uuid: req.params.id,
        },
      ],
    });
    if (!nilai) return res.status(404).json({ msg: "Data Tidak Diteukan" });
    let response;
    if (req.role === "admin") {
      response = await RekapNilai.findOne({
        include: [
          {
            model: User,
            atributes: ["username", "password"],
          },
        ],
      });
    } else {
      response = await RekapNilai.findOne({
        where: {
          [Op.and]: [{ id: nilai.id }, { userId: req.userId }],
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
// CREATE DATA REKAP NILAI
export const createRekap = async (req, res) => {
  const dataSiswaId = await Siswa.findOne({
    where: {
      userId: req.userId, // Mencocokkan userId dengan req.userId
    },
    order: [['createdAt', 'DESC']],
  });

  if (!dataSiswaId) {
    return res.status(404).json({ msg: "Data Siswa tidak ditemukan" });
  }
  try{
    const avrg_nilai = await Nilai.findOne({
      attributes: [
        "pkn1",
        "pkn2",
        "pkn3",
        "pkn4",
        "pkn5",
        "bindo1",
        "bindo2",
        "bindo3",
        "bindo4",
        "bindo5",
        "mtk1",
        "mtk2",
        "mtk3",
        "mtk4",
        "mtk5",
        "ips1",
        "ips2",
        "ips3",
        "ips4",
        "ips5",
        "ipa1",
        "ipa2",
        "ipa3",
        "ipa4",
        "ipa5",
      ],
      where: {
        dataSiswaId: dataSiswaId.id, // Mencocokkan userId dengan req.userId
      },
    });
    if(avrg_nilai){
      const total_pkn = (
        avrg_nilai.pkn1 + avrg_nilai.pkn2 + avrg_nilai.pkn3 + avrg_nilai.pkn4 + avrg_nilai.pkn5
        );
      const total_bindo = (
        avrg_nilai.bindo1 + avrg_nilai.bindo2 + avrg_nilai.bindo3 + avrg_nilai.bindo4 + avrg_nilai.bindo5
        );
      const total_mtk = (
        avrg_nilai.mtk1 + avrg_nilai.mtk2 + avrg_nilai.mtk3 + avrg_nilai.mtk4 + avrg_nilai.mtk5
        );
      const total_ips = (
        avrg_nilai.ips1 + avrg_nilai.ips2 + avrg_nilai.ips3 + avrg_nilai.ips4 + avrg_nilai.ips5
        );
      const total_ipa = (
        avrg_nilai.ipa1 + avrg_nilai.ipa2 + avrg_nilai.ipa3 + avrg_nilai.ipa4 + avrg_nilai.ipa5
        );

        // Menghitung rata-rata
        const avrg_nilai_pkn = total_pkn / 5;
        const avrg_nilai_bindo = total_bindo / 5;
        const avrg_nilai_mtk = total_mtk / 5;
        const avrg_nilai_ips = total_ips / 5;
        const avrg_nilai_ipa = total_ipa / 5;

        try {
          await RekapNilai.create({
            userId: req.userId,
            dataSiswaId: dataSiswaId.id,
            nama_lengkap: dataSiswaId.nama_lengkap,
            avrg_nilai_pkn: avrg_nilai_pkn,
            avrg_nilai_bindo: avrg_nilai_bindo,
            avrg_nilai_mtk: avrg_nilai_mtk,
            avrg_nilai_ips: avrg_nilai_ips,
            avrg_nilai_ipa: avrg_nilai_ipa,
            jarak: dataSiswaId.jarak,
            usia: dataSiswaId.usia,
          });
          res.status(201).json({ msg: "Data rekap Berhasil Diinput" });
        } catch (error) {
          res.status(500).json({ msg: error.message });
        }
    }else {
      console.log("Data nilai tidak ditemukan.");
      res.status(404).json({ msg: "Data nilai tidak ditemukan." });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//UPDATE RekapNilai
export const updateNilai = async (req, res) => {
  const dataSiswaId = await Siswa.findOne({
    where: {
      id:req.params.id // Mencocokkan userId dengan req.userId
    },
  });

  if (!dataSiswaId) {
    return res.status(404).json({ msg: "Data Siswa tidak ditemukan" });
  }
  try{
    const avrg_nilai = await Nilai.findOne({
      attributes: [
        "pkn1",
        "pkn2",
        "pkn3",
        "pkn4",
        "pkn5",
        "bindo1",
        "bindo2",
        "bindo3",
        "bindo4",
        "bindo5",
        "mtk1",
        "mtk2",
        "mtk3",
        "mtk4",
        "mtk5",
        "ips1",
        "ips2",
        "ips3",
        "ips4",
        "ips5",
        "ipa1",
        "ipa2",
        "ipa3",
        "ipa4",
        "ipa5",
      ],
      where: {
        dataSiswaId: dataSiswaId.id, // Mencocokkan userId dengan req.userId
      },
    });
    if(avrg_nilai){
      const total_pkn = (
        avrg_nilai.pkn1 + avrg_nilai.pkn2 + avrg_nilai.pkn3 + avrg_nilai.pkn4 + avrg_nilai.pkn5
        );
      const total_bindo = (
        avrg_nilai.bindo1 + avrg_nilai.bindo2 + avrg_nilai.bindo3 + avrg_nilai.bindo4 + avrg_nilai.bindo5
        );
      const total_mtk = (
        avrg_nilai.mtk1 + avrg_nilai.mtk2 + avrg_nilai.mtk3 + avrg_nilai.mtk4 + avrg_nilai.mtk5
        );
      const total_ips = (
        avrg_nilai.ips1 + avrg_nilai.ips2 + avrg_nilai.ips3 + avrg_nilai.ips4 + avrg_nilai.ips5
        );
      const total_ipa = (
        avrg_nilai.ipa1 + avrg_nilai.ipa2 + avrg_nilai.ipa3 + avrg_nilai.ipa4 + avrg_nilai.ipa5
        );

        // Menghitung rata-rata
        const avrg_nilai_pkn = total_pkn / 5;
        const avrg_nilai_bindo = total_bindo / 5;
        const avrg_nilai_mtk = total_mtk / 5;
        const avrg_nilai_ips = total_ips / 5;
        const avrg_nilai_ipa = total_ipa / 5;

        try {
          await RekapNilai.update(
            {
              userId: req.userId,
              dataSiswaId: dataSiswaId.id,
              nama_lengkap: dataSiswaId.nama_lengkap,
              avrg_nilai_pkn: avrg_nilai_pkn,
              avrg_nilai_bindo: avrg_nilai_bindo,
              avrg_nilai_mtk: avrg_nilai_mtk,
              avrg_nilai_ips: avrg_nilai_ips,
              avrg_nilai_ipa: avrg_nilai_ipa,
              jarak: dataSiswaId.jarak,
              usia: dataSiswaId.usia,
            },
            {
              where: {
                dataSiswaId: dataSiswaId.id,
              },
            }
          );
          res.status(201).json({ msg: "Data rekap Berhasil Diinput" });
        } catch (error) {
          res.status(500).json({ msg: error.message });
        }
    }else {
      console.log("Data nilai tidak ditemukan.");
      res.status(404).json({ msg: "Data nilai tidak ditemukan." });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//HAPUS RekapNilai
export const deleteNilai = async (req, res) => {
  try {
    const nilai = await RekapNilai.findOne({
      where: {
        userId:req.userId
      },
    });
    if (!nilai) return res.status(404).json({ msg: "Data tidak ditemukan" });
    if (req.role === "admin") {
      await RekapNilai.destroy({
        where: {
          id: nilai.id,
        },
      });
    } else {
      if (req.userId !== nilai.userId)
        return res.status(403).json({ msg: "Anda tidak memiliki akses" });
      await RekapNilai.destroy({
        where: {
          [Op.and]: [{ id: nilai.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Siswa Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

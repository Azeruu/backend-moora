import Nilai from "../models/NilaiModel.js";
import User from "../models/UserModel.js";
import Siswa from "../models/SiswaModel.js";
import { Op } from "sequelize";

//get Nilai
export const getNilai = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Nilai.findAll({
        // include: [
        //   {
        //     model: User,
        //     attributes: ["id", "username", "email"],
        //   },
        // ],
      });
    } else {
      const dataSiswaId = await Siswa.findOne({
        where: {
          userId: req.userId, // Mencocokkan userId dengan req.userId
        },
      });
      if (!dataSiswaId) {
        return res.status(404).json({ msg: "Data Siswa tidak ditemukan" });
      }
      response = await Nilai.findAll({
        // Menggunakan Where agar user hanya bisa melihat data yang ia input saja
        where:{
          dataSiswaId : dataSiswaId.id,
        }
        // include: [
        //   {
        //     model: User,
        //     attributes: ["id", "username", "email"],
        //   },
        // ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get Nilai By ID
export const getNilaiById = async (req, res) => {
  try {
    const nilai = await Nilai.findOne({
      where: [
        {
          dataSiswaId: req.params.id,
        },
      ],
    });
    if (!nilai) return res.status(404).json({ msg: "Data Tidak Ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Nilai.findOne({
        // include: [
        //   {
        //     model: User,
        //     atributes: ["id","username", "password"],
        //   },
        // ],
      });
    } else {
      response = await Nilai.findOne({
        where: {
          [Op.and]: [{ id: nilai.id }, { userId: req.userId }],
        },
        // include: [
        //   {
        //     model: User,
        //     attributes: ["id","username", "email"],
        //   },
        // ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createNilai = async (req, res) => {
  const {
    dataSiswaId,
    pkn1,
    bindo1,
    mtk1,
    ips1,
    ipa1,
    pkn2,
    bindo2,
    mtk2,
    ips2,
    ipa2,
    pkn3,
    bindo3,
    mtk3,
    ips3,
    ipa3,
    pkn4,
    bindo4,
    mtk4,
    ips4,
    ipa4,
    pkn5,
    bindo5,
    mtk5,
    ips5,
    ipa5,
  } = req.body;
  try {
    await Nilai.create({
      dataSiswaId: dataSiswaId,
      pkn1: pkn1,
      bindo1: bindo1,
      mtk1: mtk1,
      ips1: ips1,
      ipa1: ipa1,
      pkn2: pkn2,
      bindo2: bindo2,
      mtk2: mtk2,
      ips2: ips2,
      ipa2: ipa2,
      pkn3: pkn3,
      bindo3: bindo3,
      mtk3: mtk3,
      ips3: ips3,
      ipa3: ipa3,
      pkn4: pkn4,
      bindo4: bindo4,
      mtk4: mtk4,
      ips4: ips4,
      ipa4: ipa4,
      pkn5: pkn5,
      bindo5: bindo5,
      mtk5: mtk5,
      ips5: ips5,
      ipa5: ipa5,
    });
    res.status(201).json({ msg: "Data Nilai Berhasil Diinput" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//UPDATE Nilai
export const updateNilai = async (req, res) => {
  const nilai = await Nilai.findOne({
    where: {
      dataSiswaId: req.params.id,
    },
  });

  if (!nilai) {
    return res.status(404).json({ msg: "Data Nilai tidak ditemukan" });
  }
  const {
    pkn1,
    bindo1,
    mtk1,
    ips1,
    ipa1,
    pkn2,
    bindo2,
    mtk2,
    ips2,
    ipa2,
    pkn3,
    bindo3,
    mtk3,
    ips3,
    ipa3,
    pkn4,
    bindo4,
    mtk4,
    ips4,
    ipa4,
    pkn5,
    bindo5,
    mtk5,
    ips5,
    ipa5,
  } = req.body;
  try {
    if (req.role === "admin") {
      await Nilai.update(
        {
          pkn1,
          bindo1,
          mtk1,
          ips1,
          ipa1,
          pkn2,
          bindo2,
          mtk2,
          ips2,
          ipa2,
          pkn3,
          bindo3,
          mtk3,
          ips3,
          ipa3,
          pkn4,
          bindo4,
          mtk4,
          ips4,
          ipa4,
          pkn5,
          bindo5,
          mtk5,
          ips5,
          ipa5,
        },
        {
          where: {
            dataSiswaId: nilai.dataSiswaId,
          },
        }
      );
    } else {
        return res.status(403).json({ msg: "Anda tidak memiliki akses" });
    }
    res.status(200).json({ msg: "Data Siswa Berhasil Diupdate" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//HAPUS Nilai
export const deleteNilai = async (req, res) => {
  try {
    const dataSiswaId = await Siswa.findOne({
      where: {
        userId: req.userId,
      },
    });

    if (!dataSiswaId) {
      return res.status(404).json({ msg: "Data Siswa tidak ditemukan" });
    }

    // Cari data nilai berdasarkan dataSiswaId
    const nilai = await Nilai.findOne({
      where: {
        dataSiswaId: dataSiswaId.id,
      },
    });

    if (!nilai) {
      return res.status(404).json({ msg: "Data Nilai tidak ditemukan" });
    }
    if (req.role === "admin") {
      await Nilai.destroy({
        where: {
          id: nilai.id,
        },
      });
    } else {
        return res.status(403).json({ msg: "Anda tidak memiliki akses" });
    }
    res.status(200).json({ msg: "Data Siswa Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

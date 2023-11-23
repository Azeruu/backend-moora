import Kriteria from "../models/KriteriaModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

//get Kriteria
export const getKriteria = async (req, res) => {
  try {
    let respose;
    if (req.role === "admin") {
      respose = await Kriteria.findAll({
        include: [
          {
            model: User,
            atributes: ["username", "password"],
          },
        ],
      });
    } else {
      respose = await Kriteria.findAll({
        where: { userId: req.userId },
        include: [{ model: User, atributes: ["username", "email"] }],
      });
    }
    res.status(200).json(respose);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//get Kriteria By ID
export const getKriteriaById = async (req, res) => {
  try {
    const kriteria = await Kriteria.findOne({
      where: [
        {
          uuid: req.params.id,
        },
      ],
    });
    if (!kriteria) return res.status(404).json({ msg: "Data Tidak Ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Kriteria.findOne({
        include: [
          {
            model: User,
            atributes: ["username", "password"],
          },
        ],
      });
    } else {
      response = await Kriteria.findOne({
        where: {
          [Op.and]: [{ id: kriteria.id }, { userId: req.userId }],
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
export const createKriteria = async (req, res) => {
  const { nama_kriteria } = req.body;
  try {
    await Kriteria.create({
      nama_kriteria: nama_kriteria,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Data Mata Pelajaran Berhasil Diinput" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//UPDATE Kriteria
export const updateKriteria = async (req, res) => {
  try {
    const kriteria = await Kriteria.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!Kriteria) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { nama_kriteria } = req.body;
    if (req.role === "admin") {
      await Kriteria.update(
        {
          nama_kriteria,
        },
        {
          where: {
            id: kriteria.id,
          },
        }
      );
    } else {
      if (req.userId !== kriteria.userId)
        return res.status(403).json({ msg: "Anda tidak memiliki akses" });
      await Kriteria.update(
        {
          nama_kriteria,
        },
        {
          where: {
            [Op.and]: [{ id: kriteria.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Data Mata Pelajaran Berhasil Diupdate" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//HAPUS Kriteria
export const deleteKriteria = async (req, res) => {
  try {
    const kriteria = await Kriteria.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!Kriteria) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { nama_kriteria } = req.body;
    if (req.role === "admin") {
      await Kriteria.destroy({
        where: {
          id: kriteria.id,
        },
      });
    } else {
      if (req.userId !== kriteria.userId)
        return res.status(403).json({ msg: "Anda tidak memiliki akses" });
      await Kriteria.destroy({
        where: {
          [Op.and]: [{ id: kriteria.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Data Siswa Berhasil Dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

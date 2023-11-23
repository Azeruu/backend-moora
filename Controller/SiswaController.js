import Siswa from "../models/SiswaModel.js";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

//GET SISWA
export const getSiswa = async (req, res) => {
  try {
    let response;
    if(req.role === "admin") {
      response = await Siswa.findAll({
        attributes: [
          "id",
          "nama_jalur",
          "NISN",
          "nama_lengkap",
          "jenis_kelamin",
          "NIK",
          "tempat_lahir",
          "tgl_lahir",
          "usia",
          "asal_sekolah",
          "nama_jalan",
          "no_rumah",
          "RT",
          "RW",
          "Desa",
          "Kecamatan",
          "jarak",
        ],
        include: [
          {
            model: User,
            attributes: ["id","username", "email"],
          },
        ],
      });
    }else{
      response = await Siswa.findAll({
        attributes: [
          "id",
          "nama_jalur",
          "NISN",
          "nama_lengkap",
          "jenis_kelamin",
          "NIK",
          "tempat_lahir",
          "tgl_lahir",
          "usia",
          "asal_sekolah",
          "nama_jalan",
          "no_rumah",
          "RT",
          "RW",
          "Desa",
          "Kecamatan",
          "jarak",
        ],
        // Menggunakan Where agar user hanya bisa melihat data yang ia input saja
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["id","username", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//GET SISWA BY ID
export const getSiswaById = async (req, res) => {
  try {
    const siswa = await Siswa.findOne({
      where:{
        id: req.params.id
      }
    });
    if(!siswa) return res.status(404).json({msg : 'Data tidak ditemukan'});
    let response;
    if(req.role === "admin") {
      response = await Siswa.findOne({
        attributes: [
          "id",
          "nama_jalur",
          "NISN",
          "nama_lengkap",
          "jenis_kelamin",
          "NIK",
          "tempat_lahir",
          "tgl_lahir",
          "usia",
          "asal_sekolah",
          "nama_jalan",
          "no_rumah",
          "RT",
          "RW",
          "Desa",
          "Kecamatan",
          "jarak",
        ],
        where: {
          userId: siswa.userId,
          id:siswa.id
        },
        include: [
          {
            model: User,
            attributes: ["id","username", "email"],
          },
        ],
      });
    }else{
      response = await Siswa.findOne({
        attributes: [
          "id",
          "nama_jalur",
          "NISN",
          "nama_lengkap",
          "jenis_kelamin",
          "NIK",
          "tempat_lahir",
          "tgl_lahir",
          "usia",
          "asal_sekolah",
          "nama_jalan",
          "no_rumah",
          "RT",
          "RW",
          "Desa",
          "Kecamatan",
          "jarak",
        ],
        where: {
          [Op.and]: [{ id: siswa.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["id","username", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//CREATE SISWA
export const createSiswa = async (req, res, next) => {
    if (req.role !== "admin") {
      const siswaExist = await Siswa.findOne({
        where: {
          userId:req.userId
        }
      });
    
      if (siswaExist) {
        return res.status(400).json({ msg: "Anda sudah melakukan input, Tidak dapat melakukan input data lebih dari 1 kali" });
      }
    }
  const {
    nama_jalur,
    NISN,
    nama_lengkap,
    jenis_kelamin,
    NIK,
    tempat_lahir,
    tgl_lahir,
    usia,
    asal_sekolah,
    nama_jalan,
    no_rumah,
    RT,
    RW,
    Desa,
    Kecamatan,
    jarak
  } = req.body;
  try {
    const siswaBaru = await Siswa.create({
      nama_jalur:nama_jalur,
      NISN: NISN,
      nama_lengkap: nama_lengkap,
      jenis_kelamin: jenis_kelamin,
      NIK:NIK,
      tempat_lahir: tempat_lahir,
      tgl_lahir: tgl_lahir,
      usia:usia,
      asal_sekolah: asal_sekolah,
      nama_jalan:nama_jalan,
      no_rumah:no_rumah,
      RT:RT,
      RW:RW,
      Desa:Desa,
      Kecamatan:Kecamatan,
      jarak: jarak,
      userId: req.userId,
    });
    res.status(201).json({msg : 'Data Siswa Berhasil Diinput', idSiswaBaru : siswaBaru.id});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//UPDATE SISWA
export const updateSiswa = async (req, res) => {
  try {
    const siswa = await Siswa.findOne({
      where:{
        id: req.params.id
      }
    });
    if(!siswa) return res.status(404).json({msg : 'Data tidak ditemukan'});
    const {
      nama_jalur,
      NISN,
      nama_lengkap,
      jenis_kelamin,
      NIK,
      tempat_lahir,
      tgl_lahir,
      usia,
      asal_sekolah,
      nama_jalan,
      no_rumah,
      RT,
      RW,
      Desa,
      Kecamatan,
      jarak,
    } = req.body;
    if(req.role === "admin") {
      await Siswa.update(
        {
          nama_jalur,
          NISN,
          nama_lengkap,
          jenis_kelamin,
          NIK,
          tempat_lahir,
          tgl_lahir,
          usia,
          asal_sekolah,
          nama_jalan,
          no_rumah,
          RT,
          RW,
          Desa,
          Kecamatan,
          jarak,
        },
        {
          where: {
            id: siswa.id,
          },
        }
      );
    }else{
      if(req.userId !== siswa.userId) return res.status(403).json({msg : 'Anda tidak memiliki akses'});
      await Siswa.update(
        {
          nama_jalur,
          NISN,
          nama_lengkap,
          jenis_kelamin,
          NIK,
          tempat_lahir,
          tgl_lahir,
          usia,
          asal_sekolah,
          nama_jalan,
          no_rumah,
          RT,
          RW,
          Desa,
          Kecamatan,
          jarak,
        },
        {
          where: {
            [Op.and]: [{ id: siswa.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({msg : "Data Siswa Berhasil Diupdate"});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//HAPUS SISWA
export const deleteSiswa = async (req, res) => {
  try {
    const siswa = await Siswa.findOne({
      where: {
        id: req.params.id,
      },
    });
    if(!siswa) return res.status(404).json({msg : 'Data tidak ditemukan'});

    if(req.role === "admin") {
      await Siswa.destroy({
        where:{
          id:siswa.id
        }
      });
    }else{
      if(req.userId !== siswa.userId) return res.status(403).json({msg : 'Anda tidak memiliki akses'});
      await Siswa.destroy({
        where:{
          [Op.and]: [{ id: siswa.id }, { userId: req.userId }],
        }
      });
    }
    res.status(200).json({msg : "Data Siswa Berhasil Dihapus"});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

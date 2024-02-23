import argon2 from "argon2";
import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes:['id','username','email','role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes:['id','username','email','role'],
            where:{
                id:req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message});
    }
}

export const createUser = async (req, res) => {
    const {username, email, password, confirmPassword, role} = req.body;
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: email }
        ]
      }
    });
  
    if (existingUser) {
      // Jika username atau email sudah ada, kirim pesan error
      return res.status(400).json({ msg: "Username atau email sudah terpakai" });
    }
    if(password !== confirmPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak sama"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            username:username,
            email:email,
            password:hashPassword,
            role:role
        });
        res.status(201).json({msg : "Register Berhasil"})
    } catch(error){
        res.status(400).json({msg : error.message})
    }
}
export const updateUser = async (req, res) => {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if(!user)return res.status(404).json({msg : "User Tidak ditemukan"});
    const { username, email, password, confirmPassword, role } = req.body;
    let hashPassword;
    if (password === user.password || password === undefined) {
      hashPassword = user.password;
    } else {
      hashPassword = await argon2.hash(password);
    }
    if(password !== confirmPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak sama"});
    try {
      await User.update({
        username: username,
        email: email,
        password: hashPassword,
        role: role,
      },{
        where:{
            id:user.id
        }
      });
      res.status(200).json({ msg: "User Berhasil Diupdate" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
}
export const deleteUser = async (req, res) => {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if(!user)return res.status(404).json({msg : "User Tidak ditemukan"});
    try {
      await User.destroy({
        where:{
            id:user.uuid
        }
      });
      res.status(200).json({ msg: "User Berhasil dihapus" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
}
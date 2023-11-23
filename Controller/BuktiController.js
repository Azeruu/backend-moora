import Bukti from "../models/BuktiModel.js";
import fs from "fs";

//get Bukti
export const getBukti = async (req, res) => {
    try {
        const response = await Bukti.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

//get Bukti By ID
export const getBuktiById = async (req, res) => {
    try {
        const response = await Bukti.findOne({
            where :{
                id : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const saveBukti = async (req, res) => {
    if(req.files === null)return res.status(400).json({msg:"Tidak ad file yang di Upload"});
    const nama = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const extension = path.extname(file.name);
    const fileName = file.md5 + extension;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpeg','.jpg'];

    if(!allowedType.includes(extension.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
    if(fileSize > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});
    
    file.mv(`./public/images/${fileName}`, async(err) =>{
        if(err) return res.status(500).json({msg:err.message});
        try {
            await Bukti.create({nama:nama, filebukti:fileName ,url:url});
            res.status(201).json({msg:"Upload Bukti Berhasil"})
        } catch (error) {
            console.log(error.message);
        }
    })
};

//UPDATE Bukti
export const updateBukti = async (req, res) => {
    const bukti = await Bukti.findOne({
        where :{
            id : req.params.id
        }
    });
    if(!bukti) return res.status(404).json({msg:"Data tidak ditemukan"});
    let namaFile = "";
    if(req.files === null){
        namaFile = Bukti.filebukti;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const extension = path.extname(file.name);
        fileName = file.md5 + extension;
        const allowedType = ['.png','.jpeg','.jpg'];

        if(!allowedType.includes(extension.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
        if(fileSize > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});

        const filePath = `./public/images/${bukti.filebukti}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`,(err) =>{
            if(err) return res.status(500).json({msg:err.message});
        });
    }
    const nama = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

    try {
        await Bukti.update({nama:nama, filebukti:fileName, url:url},{
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({msg:"Berhasil memperbarui"})
    } catch (error) {
        console.log(error.message);
    }
};

//HAPUS Bukti
export const deleteBukti = async (req, res) => {
    const bukti = await Bukti.findOne({
        where :{
            id : req.params.id
        }
    });
    if(!bukti) return res.status(404).json({msg:"Data tidak ditemukan"});

    try {
        const filePath = `./public/images/${bukti.filebukti}`;
        fs.unlinkSync(filePath);
        await Bukti.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({msg: "Berhasil Menghapus Bukti"})
    } catch (error) {
        console.log(error.message);
    }
};

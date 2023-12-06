import Bukti from "../models/BuktiModel.js";
import path from "path";
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
                dataSiswaId : req.params.id
            }
        });
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const saveBukti = async (req, res) => {
    if(req.files === null)return res.status(400).json({msg:"Tidak ad file yang di Upload"});
    const dataSiswaId = req.body.dataSiswaId;
    const file1 = req.files.ijazah_sk;
    const file2 = req.files.kartu_keluarga;
    const file3 = req.files.akta_kelahiran;
    const file4 = req.files.SS_lulus_dapodik;
    const fileSize1 = file1.data.length;
    const fileSize2 = file2.data.length;
    const fileSize3 = file3.data.length;
    const fileSize4 = file4.data.length;
    const extension1 = path.extname(file1.name);
    const extension2 = path.extname(file2.name);
    const extension3 = path.extname(file3.name);
    const extension4 = path.extname(file4.name);
    const ijazah_sk = file1.md5 + extension1;
    const kartu_keluarga = file2.md5 + extension2;
    const akta_kelahiran = file3.md5 + extension3;
    const SS_lulus_dapodik = file4.md5 + extension4;
    const url1 = `${req.protocol}://${req.get("host")}/images/${ijazah_sk}`;
    const url2 = `${req.protocol}://${req.get("host")}/images/${kartu_keluarga}`;
    const url3 = `${req.protocol}://${req.get("host")}/images/${akta_kelahiran}`;
    const url4 = `${req.protocol}://${req.get("host")}/images/${SS_lulus_dapodik}`;
    const allowedType = ['.png','.jpeg','.jpg'];

    if(!allowedType.includes(extension1.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
    if(!allowedType.includes(extension2.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
    if(!allowedType.includes(extension3.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
    if(!allowedType.includes(extension4.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
    if(fileSize1 > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});
    if(fileSize2 > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});
    if(fileSize3 > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});
    if(fileSize4 > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});
    
    const targetPaths = {
        ijazah_sk: `./public/images/${ijazah_sk}`,
        kartu_keluarga: `./public/images/${kartu_keluarga}`,
        akta_kelahiran: `./public/images/${akta_kelahiran}`,
        SS_lulus_dapodik: `./public/images/${SS_lulus_dapodik}`,
    };

    file1.mv(targetPaths.ijazah_sk, async(err) => {
    if (err) return res.status(500).json({ msg:"file 1 gagal" + err.message });

    // Pindahkan file lain setelah file pertama selesai diunggah
    file2.mv(targetPaths.kartu_keluarga, async(err) => {
        if (err) return res.status(500).json({ msg: "file 2 gagal" +err.message });

        file3.mv(targetPaths.akta_kelahiran, async(err) => {
        if (err) return res.status(500).json({ msg: "file 3 gagal" +err.message });

        file4.mv(targetPaths.SS_lulus_dapodik, async (err) => {
            if (err) return res.status(500).json({ msg: "file 4 gagal" +err.message });

            try {
            await Bukti.create({
                dataSiswaId,
                ijazah_sk: ijazah_sk,
                kartu_keluarga: kartu_keluarga,
                akta_kelahiran: akta_kelahiran,
                SS_lulus_dapodik: SS_lulus_dapodik,
                url_ijazah: url1,
                url_akta: url3,
                url_kk: url2,
                url_dapodik: url4,
            });
            res.status(201).json({ msg: "Upload Bukti Berhasil" });
            } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: error.message });
            }
        });
        });
    });
    });
};

//UPDATE Bukti
export const updateBukti = async (req, res) => {
    try {
        const dataSiswaId = req.params.id;
        let ijazah_sk='';
        let kartu_keluarga='';
        let akta_kelahiran='';
        let SS_lulus_dapodik='';
        const allowedType = ['.png','.jpeg','.jpg'];

        // Untuk File 1
        if (req.files?.ijazah_sk === undefined ) {
            const bukti = await Bukti.findOne({
                where :{
                    dataSiswaId : req.params.id
                }
                });
                if(!bukti) {
                    return res.status(404).json({msg:"Data tidak ditemukan"});
                };
            ijazah_sk = bukti.ijazah_sk;
        }
        else{
            const file1 = req.files.ijazah_sk;
            const fileSize1 = file1.data.length;
            const extension1 = path.extname(file1.name);
            ijazah_sk = file1.md5 + extension1;

            if(!allowedType.includes(extension1.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
            if(fileSize1 > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});
            fs.unlinkSync(`./public/images/${req.body.old_ijazah_sk}`);

            file1.mv(`./public/images/${ijazah_sk}`,(err) => {
                if (err) return res.status(500).json({ msg: "Gagal mengganti file ijazah_sk" + err.message });
            });
        }

        // Untuk file 2
        if (req.files?.kartu_keluarga === undefined ) {
            const bukti = await Bukti.findOne({
                where :{
                    dataSiswaId : req.params.id
                }
                });
                if(!bukti) {
                    return res.status(404).json({msg:"Data tidak ditemukan"});
                };
            kartu_keluarga = bukti.kartu_keluarga;
        }
        else{
            const file2 = req.files.kartu_keluarga;
            const fileSize2 = file2.data.length;
            const extension2 = path.extname(file2.name);
            kartu_keluarga = file2.md5 + extension2;

            if(!allowedType.includes(extension2.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
            if(fileSize2 > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});
            fs.unlinkSync(`./public/images/${req.body.old_kartu_keluarga}`);

            file2.mv(`./public/images/${kartu_keluarga}`,(err) => {
                if (err) return res.status(500).json({ msg: "Gagal mengganti file Kartu Keluarga" + err.message });
            });
        }

        // Untuk file 3
        if (req.files?.akta_kelahiran === undefined ) {
            const bukti = await Bukti.findOne({
                where :{
                    dataSiswaId : req.params.id
                }
                });
                if(!bukti) {
                    return res.status(404).json({msg:"Data tidak ditemukan"});
                };
            akta_kelahiran = bukti.akta_kelahiran;
        }
        else{
            const file3 = req.files.akta_kelahiran;
            const fileSize3 = file3.data.length;
            const extension3 = path.extname(file3.name);
            akta_kelahiran = file3.md5 + extension3;

            if(!allowedType.includes(extension3.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
            if(fileSize3 > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});
            fs.unlinkSync(`./public/images/${req.body.old_akta_kelahiran}`);

            file3.mv(`./public/images/${akta_kelahiran}`,(err) => {
                if (err) return res.status(500).json({ msg: "Gagal mengganti file Akta Kelahiran" + err.message });
            });
        }

        // Untuk File 4
        if (req.files?.SS_lulus_dapodik === undefined ) {
            const bukti = await Bukti.findOne({
                where :{
                    dataSiswaId : req.params.id
                }
                });
                if(!bukti) {
                    return res.status(404).json({msg:"Data tidak ditemukan"});
                };
                SS_lulus_dapodik = bukti.SS_lulus_dapodik;
        }
        else{
            const file4 = req.files.SS_lulus_dapodik;
            const fileSize4 = file4.data.length;
            const extension4 = path.extname(file4.name);
            SS_lulus_dapodik = file4.md5 + extension4;

            if(!allowedType.includes(extension4.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
            if(fileSize4 > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});
            fs.unlinkSync(`./public/images/${req.body.old_SS_lulus_dapodik}`);

            file4.mv(`./public/images/${SS_lulus_dapodik}`,(err) => {
                if (err) return res.status(500).json({ msg: "Gagal mengganti file ijazah_sk" + err.message });
            });
        }

        await Bukti.update({
            ijazah_sk: ijazah_sk,
            kartu_keluarga: kartu_keluarga,
            akta_kelahiran: akta_kelahiran,
            SS_lulus_dapodik: SS_lulus_dapodik,
        },{
            where: {
                dataSiswaId : dataSiswaId,
            }
        });
        res.status(201).json({ msg: "Upload Bukti Berhasil" });
    } catch (error){
        console.error(error.message);
        res.status(500).json({msg:"terjadi kesalahan Saat Mengedit data"});
    }
};
//HAPUS Bukti
export const deleteBukti = async (req, res) => {
    const bukti = await Bukti.findOne({
        where :{
            dataSiswaId : req.params.id
        }
    });
    if(!bukti) return res.status(404).json({msg:"Data tidak ditemukan"});

    try {
        const filePath1 = `./public/images/${bukti.ijazah_sk}`;
        const filePath2 = `./public/images/${bukti.kartu_keluarga}`;
        const filePath3 = `./public/images/${bukti.akta_kelahiran}`;
        const filePath4 = `./public/images/${bukti.SS_lulus_dapodik}`;
        fs.unlinkSync(filePath1);
        fs.unlinkSync(filePath2);
        fs.unlinkSync(filePath3);
        fs.unlinkSync(filePath4);
        await Bukti.destroy({
            where:{
                dataSiswaId:req.params.id
            }
        });
        res.status(200).json({msg: "Berhasil Menghapus Bukti"})
    } catch (error) {
        console.log(error.message);
    }
};

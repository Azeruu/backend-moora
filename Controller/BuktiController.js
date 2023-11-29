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
    const bukti = await Bukti.findOne({
        where :{
            dataSiswaId : req.params.id
        }
    });
    if(!bukti) return res.status(404).json({msg:"Data tidak ditemukan"});
    const dataSiswaId = req.params.id;
    const file1 = req.files && req.files.ijazah_sk;
    const file2 = req.files && req.files.kartu_keluarga;
    const file3 = req.files && req.files.akta_kelahiran;
    const file4 = req.files && req.files.SS_lulus_dapodik;
    const allowedType = ['.png','.jpeg','.jpg'];

    // FILE 1
    if (file1) {
        const fileSize1 = file1.data.length;
        const extension1 = path.extname(file1.name);
        const ijazah_sk = file1.md5 + extension1;
        if(!allowedType.includes(extension1.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
        if(fileSize1 > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});
        const url1 = `${req.protocol}://${req.get("host")}/images/${ijazah_sk}`;
        const targetPaths1 = {
            ijazah_sk: `./public/images/${ijazah_sk}`
        };
        // fs.unlinkSync(targetPaths1.ijazah_sk);

        await file1.mv(`./public/images/${targetPaths1.ijazah_sk}`, async(err) =>{
            if(err) return res.status(500).json({msg:err.message});
            try {
                await Bukti.update({
                    dataSiswaId,
                    ijazah_sk: ijazah_sk,
                    kartu_keluarga,
                    akta_kelahiran,
                    SS_lulus_dapodik,
                    url_ijazah: url1,
                    url_akta,
                    url_kk,
                    url_dapodik,
                },{
                    where:{
                        dataSiswaId:dataSiswaId,
                    }
                });
                res.status(200).json({msg:"Berhasil memperbarui"})
            } catch (error) {
                console.log(error.message);
            }
        });
    }else {
        // Jika file1 tidak diunggah, gunakan file sebelumnya
        const url1 = bukti ? bukti.url_ijazah : null;
        const ijazah_sk = bukti ? bukti.ijazah_sk : null;
        try {
            await Bukti.update({
                dataSiswaId,
                ijazah_sk,
                kartu_keluarga: bukti.kartu_keluarga,
                akta_kelahiran: bukti.akta_kelahiran,
                SS_lulus_dapodik: bukti.SS_lulus_dapodik,
                url_ijazah: url1,
                url_akta: bukti.url_akta,
                url_kk: bukti.url_kk,
                url_dapodik: bukti.url_dapodik,
            }, {
                where: {
                    dataSiswaId: dataSiswaId,
                }
            });
            res.status(200).json({ msg: "Berhasil memperbarui" })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: error.message });
        };
    };
    // FILE 2
    if (file2) {
        const fileSize2 = file2.data.length;
        const extension2 = path.extname(file2.name);
        const kartu_keluarga = file2.md5 + extension2;
        const url2 = `${req.protocol}://${req.get("host")}/images/${kartu_keluarga}`;
        const allowedType = ['.png','.jpeg','.jpg'];
        if(!allowedType.includes(extension2.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
        if(fileSize2 > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});
        const targetPaths2 = {
            kartu_keluarga: `./public/images/${kartu_keluarga}`,
        };
        // fs.unlinkSync(targetPaths2.kartu_keluarga);

        await file2.mv(`./public/images/${targetPaths2.kartu_keluarga}`, async(err) =>{
            if(err) return res.status(500).json({msg:err.message});
            try {
                await Bukti.update({
                    dataSiswaId,
                    ijazah_sk,
                    kartu_keluarga: kartu_keluarga,
                    akta_kelahiran,
                    SS_lulus_dapodik,
                    url_ijazah,
                    url_kk:url2,
                    url_akta,
                    url_dapodik,
                },{
                    where:{
                        dataSiswaId:req.params.id
                    }
                });
                res.status(200).json({msg:"Berhasil memperbarui"})
            } catch (error) {
                console.log(error.message);
            }
        });
    }else {
        // Jika file2 tidak diunggah, gunakan file sebelumnya
        const url2 = bukti ? bukti.url_kk : null;
        const kartu_keluarga = bukti ? bukti.kartu_keluarga : null;

        try {
            await Bukti.update({
                dataSiswaId,
                ijazah_sk: bukti.ijazah_sk,
                kartu_keluarga,
                akta_kelahiran: bukti.akta_kelahiran,
                SS_lulus_dapodik: bukti.SS_lulus_dapodik,
                url_ijazah: bukti.url_ijazah,
                url_kk: url2,
                url_akta: bukti.url_akta,
                url_dapodik: bukti.url_dapodik,
            }, {
                where: {
                    dataSiswaId: dataSiswaId,
                }
            });
            res.status(200).json({ msg: "Berhasil memperbarui" })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: error.message });
        };
    };
    if (file3) {
        const fileSize3 = file3.data.length;
        const extension3 = path.extname(file3.name);
        const akta_kelahiran = file3.md5 + extension3;
        const url3 = `${req.protocol}://${req.get("host")}/images/${akta_kelahiran}`;
        const allowedType = ['.png','.jpeg','.jpg'];
        if(!allowedType.includes(extension3.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
        if(fileSize3 > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});
        const targetPaths3 = {
            akta_kelahiran: `./public/images/${akta_kelahiran}`,
        };
        // fs.unlinkSync(targetPaths3.akta_kelahiran);
        
        file3.mv(`./public/images/${targetPaths3.akta_kelahiran}`, async(err) =>{
            if(err) return res.status(500).json({msg:err.message});
            try {
                await Bukti.update({
                    dataSiswaId,
                    ijazah_sk,
                    kartu_keluarga,
                    akta_kelahiran:akta_kelahiran,
                    SS_lulus_dapodik,
                    url_ijazah,
                    url_kk,
                    url_akta:url3,
                    url_dapodik,
                },{
                    where:{
                        dataSiswaId:req.params.id
                    }
                });
                res.status(200).json({msg:"Berhasil memperbarui"})
            } catch (error) {
                console.log(error.message);
            }
        });
    }else {
        // Jika file3 tidak diunggah, gunakan file sebelumnya
        const url3 = bukti ? bukti.url_akta : null;
        const akta_kelahiran = bukti ? bukti.akta_kelahiran : null;

        try {
            await Bukti.update({
                dataSiswaId,
                ijazah_sk:bukti.ijazah_sk,
                kartu_keluarga: bukti.kartu_keluarga,
                akta_kelahiran,
                SS_lulus_dapodik: bukti.SS_lulus_dapodik,
                url_ijazah: bukti.url_ijazah,
                url_kk: bukti.url_kk,
                url_akta: url3,
                url_dapodik: bukti.url_dapodik,
            }, {
                where: {
                    dataSiswaId: dataSiswaId,
                }
            });
            res.status(200).json({ msg: "Berhasil memperbarui" })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: error.message });
        };
    };
    if (file4) {
        const fileSize4 = file4.data.length;
        const extension4 = path.extname(file4.name);
        const SS_lulus_dapodik = file4.md5 + extension4;
        const url4 = `${req.protocol}://${req.get("host")}/images/${SS_lulus_dapodik}`;
        const allowedType = ['.png','.jpeg','.jpg'];
        if(!allowedType.includes(extension4.toLowerCase())) return res.status(422).json({msg:"Invalid image Types"});
        if(fileSize4 > 5000000) return res.status(422).json({msg:"Ukuran File gambar harus kurang dari 5 mb"});
        const targetPaths4 = {
            SS_lulus_dapodik: `./public/images/${SS_lulus_dapodik}`,
        };
        // fs.unlinkSync(targetPaths4.SS_lulus_dapodik);

        file4.mv(`./public/images/${targetPaths4.SS_lulus_dapodik}`, async (err) =>{
            if(err) return res.status(500).json({msg:err.message});
            try {
                await Bukti.update({
                    dataSiswaId,
                    ijazah_sk,
                    kartu_keluarga,
                    akta_kelahiran,
                    SS_lulus_dapodik:SS_lulus_dapodik,
                    url_ijazah,
                    url_akta,
                    url_kk,
                    url_dapodik:url4,
                },{
                    where:{
                        dataSiswaId:req.params.id
                    }
                });
                res.status(200).json({msg:"Berhasil memperbarui"})
            } catch (error) {
                console.log(error.message);
            }
        });
    }else {
        // Jika file1 tidak diunggah, gunakan file sebelumnya
        const url4 = bukti ? bukti.url_dapodik : null;
        const SS_lulus_dapodik = bukti ? bukti.SS_lulus_dapodik : null;

        try {
            await Bukti.update({
                dataSiswaId,
                ijazah_sk:bukti.ijazah_sk,
                kartu_keluarga: bukti.kartu_keluarga,
                akta_kelahiran: bukti.akta_kelahiran,
                SS_lulus_dapodik,
                url_ijazah: bukti.url_ijazah,
                url_akta: bukti.url_akta,
                url_kk: bukti.url_kk,
                url_dapodik: url4,
            }, {
                where: {
                    dataSiswaId: dataSiswaId,
                }
            });
            res.status(200).json({ msg: "Berhasil memperbarui" })
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: error.message });
        };
};
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

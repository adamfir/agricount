'use strict'
let models = require('../models/index');
let Op = require('sequelize').Op;
let bcrypt = require('bcryptjs');

async function generatePassword(password){
    let salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password,salt);
    return password;
}

class UserController {
    constructor(){

    }
    async login(req,res,next){
        let {username, password} = req.body;
        let count = await models.user.count();
        console.log(count);
        if (count==0){
            if (username == 'admin' && password == 'p4ssw0rd_4dm1n'){
                password = await generatePassword(password);
                let user = await models.user.create({
                    name: 'Admin',
                    username, password,
                    email: 'admin@example.com',
                    otoritas: 'admin'
                });
                let beratRata = await models.parameter.count({where:{code:'PANEN_PARAM',name:'FRUIT_AVE_WEIGHT'}});
                let harga = await models.parameter.count({where:{code:'PANEN_PARAM',name:'PRICE'}});
                let companyName = await models.parameter.count({where:{code:'COMPANY_PARAM',name:'NAME'}});
                let companyAddress = await models.parameter.count({where:{code:'COMPANY_PARAM',name:'ADDRESS'}});
                let buahKe = await models.parameter.count({where:{code:'BUAH_PARAM',name:'BUAH_KE'}});
                let varietasBuah = await models.parameter.count({where:{code:'BUAH_PARAM',name:'VARIETAS'}});
                let estimasiPanen = await models.parameter.count({where:{code:'PANEN_PARAM',name:'ESTIMASI'}});
                let jenisPestisida = await models.parameter.count({where:{code:'BUAH_PARAM',name:'PESTISIDA'}});
                let jenisPupuk = await models.parameter.count({where:{code:'BUAH_PARAM',name:'PUPUK'}});
                if(beratRata == 0){
                    beratRata = await models.parameter.create({
                        code: 'PANEN_PARAM',
                        name: 'FRUIT_AVE_WEIGHT',
                        value: '167',
                        keterangan: 'Berat buah rata-rata (gram) untuk perhitungan panen. (convert ke INT)'
                    });
                }
                if(harga == 0){
                    harga = await models.parameter.create({
                        code: 'PANEN_PARAM',
                        name: 'PRICE',
                        value: '12000',
                        keterangan: 'Harga per kg untuk perhitungan panen.'
                    });
                }
                if(companyName == 0){
                    companyName = await models.parameter.create({
                        code: 'COMPANY_PARAM',
                        name: 'NAME',
                        value: 'agrowing.co.id',
                        keterangan: 'Nama Perusahaan.'
                    });
                }
                if(companyAddress == 0){
                    companyAddress = await models.parameter.create({
                        code: 'COMPANY_PARAM',
                        name: 'ADDRESS',
                        value: 'Kecamatan Tenjolaya, Kabupaten Bogor, Jawa Barat.',
                        keterangan: 'Alamat Perusahaan.'
                    });
                }
                if(buahKe == 0){
                    buahKe = await models.parameter.create({
                        code: 'BUAH_PARAM',
                        name: 'BUAH_KE',
                        value: '0',
                        keterangan: 'Buah ke- berapa hari ini. (value nya string, jangan lupa convert ke INT)'
                    });
                }
                if(varietasBuah == 0){
                    varietasBuah = await models.parameter.create({
                        code: 'BUAH_PARAM',
                        name: 'VARIETAS',
                        value: 'Jambu Biji Merah',
                        keterangan: 'Varietas Buah yang Dipanen.'
                    });
                }
                if(estimasiPanen == 0){
                    estimasiPanen = await models.parameter.create({
                        code: 'PANEN_PARAM',
                        name: 'ESTIMASI',
                        value: '40',
                        keterangan: 'Waktu yang dibutuhkan untuk buah panen setelah buah dibungkus. (convert value ke INT)'
                    });
                }
                if(jenisPestisida == 0){
                    jenisPestisida = await models.parameter.create({
                        code: 'BUAH_PARAM',
                        name: 'PESTISIDA',
                        value: '',
                        keterangan: 'Jenis pestisida yang digunakan.'
                    });
                }
                if(jenisPupuk == 0){
                    jenisPupuk = await models.parameter.create({
                        code: 'BUAH_PARAM',
                        name: 'PUPUK',
                        value: 'Pupuk Kandang, NPK, KCL',
                        keterangan: 'Jenis pupuk yang digunakan.'
                    });
                }
                delete user.dataValues.password;
                return res.status(200).json({user});
            }
            else{
                return res.status(401).json({message:"Username atau password salah!"});
            }
        }
        else {
            let user = await models.user.find({where:{username}});
            let isMatch = await bcrypt.compare(password,user.password);
            delete user.dataValues.password;
            if(isMatch){
                return res.status(200).json({user});
            }
            else{
                return res.status(401).json({message:"Username atau password salah!"});
            }
        }
    }
    async add(req,res,next){
        let {name, username, email, password, otoritas} = req.value.body;
        password = await generatePassword(password);
        console.log(password);
        let user = await models.user.create({
            name, username, email, password, otoritas
        });
        delete user.dataValues.password;
        return res.status(201).json({user});
    }
    async edit(req,res,next){
        let {name, username, email, password, otoritas} = req.value.body;
        let {id} = req.params;
        let user = await models.user.findOne({where:{id}});
        user.name = name || user.name;
        user.username = username || user.username;
        user.email = email || user.email;
        user.otoritas = otoritas || user.otoritas;
        if(password){
            password = await generatePassword(password);
            user.password = password || user.password;
        }
        await user.save();
        delete user.dataValues.password;
        return res.json({user});
    }
    async gets(req,res,next){
        let admins = await models.user.scope('withoutPassword').findAll({where:{otoritas:'admin'}, exclude: 'password'});
        let petanis = await models.user.scope('withoutPassword').findAll({where:{otoritas:'petani'}});
        return res.json({admins, petanis});
    }
    async delete(req,res,next){
        let {id} = req.params;
        let hapus = await models.user.destroy({
            where:{id}
        });
        if(hapus === 1){
            return res.json({message:"success"});
        }
        else{
            return res.json({message:"gagal"});
        }
    }
}

module.exports = UserController;
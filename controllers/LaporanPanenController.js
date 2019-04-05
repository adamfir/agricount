'use strict'
let Op = require('sequelize').Op;
let models = require('../models/index');
let moment = require('moment-timezone');

class LaporanPanenController {
    constructor(){

    }
    async get(req,res,next){
        let {date} = req.query;
        date = moment(date, 'YYYY-MM-DD').tz("Asia/Jakarta").format('YYYY-MM-DD');
        console.log(date);
        let data = {};
        let laporanPanen = await models.LaporanPanen.scope('withoutTimestamp').findOne({where:{
            tanggal: { [Op.eq]: date }
        }});
        if(laporanPanen==undefined || laporanPanen==null)
            return res.json({data:{message:"Tidak ada data"},status:400})
        let aveWeight = await models.parameter.findOne({where:{
            code: "PANEN_PARAM", name: "FRUIT_AVE_WEIGHT"
        }});
        let price = await models.parameter.findOne({where:{
            code: "PANEN_PARAM", name: "PRICE"
        }});
        console.log(aveWeight.value,price.value);
        data.tanggal = laporanPanen.tanggal;
        data.jumlahBuah = laporanPanen.jumlahBuah;
        data.berat = aveWeight.value*data.jumlahBuah/1000;
        data.satuan = "Kg",
        data.harga = data.berat*price.value;
        return res.json({data, status:200});
    }
    
}

module.exports = {LaporanPanenController};
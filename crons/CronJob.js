'use strict'
let moment = require('moment-timezone');
let models = require('../models/index');

class CronJob {
    constructor(){
        this.date = moment().add(40,'d').tz("Asia/Jakarta").format('YYYY-MM-DD');
    }
    setDate(){
        this.date = moment().add(40,'d').tz("Asia/Jakarta").format('YYYY-MM-DD');
    }
    async createLaporan(){
        console.log("Mulai CronJob Create Laporan Panen.");
        this.setDate();
        let jumlahBuah = await models.parameter
            .findOne({
                where:{code:'BUAH_PARAM',name:'BUAH_KE'}
            });
        let laporanPanen = await models.LaporanPanen.create({
            jumlahBuah:jumlahBuah.value, tanggal:this.date
        })
        jumlahBuah.value = 0;
        jumlahBuah.save();
        console.log("Laporan panen disimpan.");
    }
}

module.exports = CronJob;
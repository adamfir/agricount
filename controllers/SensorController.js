let axios = require('axios');

class SensorController {
    static async get(req,res,next){
        let data = await axios('http://156.67.217.195:2000/data_realtime');
        console.log(data.data);
        if(data.data)
            return res.json({status:"200",data:data.data});
        else
            return res.json({status:"500",message:"Terjadi kesalahan"});
    }
}

module.exports = SensorController;
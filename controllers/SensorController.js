let axios = require('axios');

class SensorController {
    static async get(req,res,next){
        let data = await axios('http://156.67.217.195:2000/data_realtime');
        console.log(data.data);
        return res.json({data:data.data});
    }
}

module.exports = SensorController;
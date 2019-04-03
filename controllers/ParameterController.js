'use strict'
let models = require('../models/index');

class ParameterController {
    constructor(){

    }
    async cetakBarCode(req,res,next){
        let data = {};
        // console.log(data);
        data.companyName = await models.parameter.scope('valueOnly').findOne({where:{code:'COMPANY_PARAM',name:'NAME'}});
        data.companyAddress = await models.parameter.scope('valueOnly').findOne({where:{code:'COMPANY_PARAM',name:'ADDRESS'}});
        
        // Untuk increment nilai buah ke- di parameter.
        let buahKe = await models.parameter.findOne({where:{code:'BUAH_PARAM',name:'BUAH_KE'}});
        buahKe.value = (parseInt(buahKe.value) + 1).toString();
        data.buahKe = {value:buahKe.value};
        await buahKe.save();

        data.varietasBuah = await models.parameter.scope('valueOnly').findOne({where:{code:'BUAH_PARAM',name:'VARIETAS'}});
        data.jenisPestisida = await models.parameter.scope('valueOnly').findOne({where:{code:'BUAH_PARAM',name:'PESTISIDA'}});
        data.jenisPupuk = await models.parameter.scope('valueOnly').findOne({where:{code:'BUAH_PARAM',name:'PUPUK'}});
        data.beratRata = await models.parameter.scope('valueOnly').findOne({where:{code:'PANEN_PARAM',name:'FRUIT_AVE_WEIGHT'}});
        return res.json({data});
    }
    async getParameters(req,res,next){
        let parameters = await models.parameter.findAll({order:[['id','ASC']]});
        return res.json({parameters});
    }
    async editParameter(code,name,value){
        try{
            let parameter = await models.parameter.find({where:{
                code,name
            }});
            parameter.value = value;
            parameter.save();
            let message = code + '-' + name + " success edit.";
            return message;
        }
        catch (e){
            let message = code + '-' + name + " failed edit. " + e
            return message;
        }
    }
    async editParameters(req,res,next){
        let codeChar = req.body;
        let results = [];
        for(let i in codeChar){
            let code = i.split('-')[0], name = i.split('-')[1], value = codeChar[i];
            let editParameter = await this.editParameter(code,name,value);
            results.push(editParameter);
        }
        return res.json({mes:"Success", results});
    }
}

module.exports = ParameterController;
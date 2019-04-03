let express = require('express');
let router = express.Router();
// const router = require('express-promise-router')();
let ParameterController = require('../controllers/ParameterController');
let {validateBody, schemas} = require('../middlewares/validation');

let parameterController = new ParameterController();

/* GET users listing. */
router.get('/cetak-bar-code', async(req,res,next)=>{
    await parameterController.cetakBarCode(req,res,next);
});
router.get('/gets', async(req,res,next)=>{
    await parameterController.getParameters(req,res,next);
});
router.post('/edits', async(req,res,next)=>{
    await parameterController.editParameters(req,res,next);
});

module.exports = router;

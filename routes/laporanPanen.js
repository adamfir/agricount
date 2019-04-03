let express = require('express');
let router = express.Router();
let {LaporanPanenController} = require('../controllers/LaporanPanenController');
let {validateBody, schemas} = require('../middlewares/validation');

let laporanPanenController = new LaporanPanenController();

/* GET users listing. */
router.get('/get', async(req,res,next)=>{
    await laporanPanenController.get(req,res,next);
});

module.exports = router;

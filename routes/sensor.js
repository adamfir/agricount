let express = require('express');
let router = express.Router();
let SensorController = require('../controllers/SensorController');

router.get('/', async(req,res,next)=>{
    await SensorController.get(req,res,next)
});

module.exports = router;
let express = require('express');
let router = express.Router();
let userRouter = require('./users');
let parameterRouter = require('./parameters');
let laporanPanenRouter = require('./laporanPanen');
let sensorRouter = require('./sensor');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('OK');
});
router.use('/users', userRouter);
router.use('/parameters', parameterRouter);
router.use('/laporan-panen', laporanPanenRouter);
router.use('/sensor', sensorRouter);
module.exports = router;

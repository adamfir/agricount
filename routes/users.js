let express = require('express');
let router = express.Router();
// const router = require('express-promise-router')();
let UserController = require('../controllers/user');
let {validateBody, schemas} = require('../middlewares/validation');

let userController = new UserController();

/* GET users listing. */
router.post('/login', validateBody(schemas.login), async(req,res,next)=>{
    userController.login(req,res,next);
});
router.post('/add', validateBody(schemas.addUser), async(req,res,next)=>{
    userController.add(req,res,next);
});
router.post('/edit/:id', validateBody(schemas.editUser), async(req,res,next)=>{
    userController.edit(req,res,next);
});
router.get('/gets', async(req,res,next)=>{
    userController.gets(req,res,next);
});
router.delete('/delete/:id', async(req,res,next)=>{
    userController.delete(req,res,next);
});

module.exports = router;

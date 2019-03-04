const express = require('express');
const router = express.Router();
const passport=require('passport');
//controller
const userController=require('../../controller/userController');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({msg:'Success'});
});

module.exports = router;

const express = require('express');
const router = express.Router();
const passport=require('passport');
const postController=require('../../controller/postController');

// @access  Public
router.get('/',postController.fetch);

// @access  Private
router.post('/create',passport.authenticate('jwt',{session:false}),postController.create);
// @access  Private
router.put('/update/:id',passport.authenticate('jwt',{session:false}),postController.update);
// @access  Private
router.delete('/delete/:id',passport.authenticate('jwt',{session:false}),postController.del);




module.exports = router;

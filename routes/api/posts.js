const express = require('express');
const router = express.Router();
const passport=require('passport');
const postController=require('../../controller/postController');
// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.post('/create',passport.authenticate('jwt',{session:false}),postController.create);

module.exports = router;

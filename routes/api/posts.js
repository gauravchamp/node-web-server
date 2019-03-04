const express = require('express');
const router = express.Router();
const passport=require('passport');
const postController=require('../../controller/postController');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   POST api/posts/create
// @desc    create post route
// @access  Private
router.post('/create',passport.authenticate('jwt',{session:false}),postController.create);

// @route   PUT api/posts/update/:id
// @desc    update post route
// @access  Private
router.put('/update/:id',passport.authenticate('jwt',{session:false}),postController.update);




module.exports = router;

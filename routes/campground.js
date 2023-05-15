const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controller/campgrounds')
const multer = require('multer');
const {storage} = require('../cloudinary')
const upload = multer({storage});

const {isLoggedIn,isAuthor,validateCampground} = require('../middleware');

router.route('/')
    .get(catchAsync(campgrounds.index))
    // .post(isLoggedIn, validateCampground,catchAsync(campgrounds.createCampground))
    .post(upload.array('image'),(req,res)=>{
        console.log(req.body,req.files)
        res.send("it workd")
    })

router.get('/new', isLoggedIn,campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isAuthor,validateCampground,catchAsync(campgrounds.updateCampground))
    .delete(isAuthor, isLoggedIn,catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit',isLoggedIn,isAuthor, catchAsync(campgrounds.renderEditForm));

// router.get('/', catchAsync(campgrounds.index));

// router.get('/new', isLoggedIn,campgrounds.renderNewForm);

// router.post('/', isLoggedIn, validateCampground,catchAsync(campgrounds.createCampground));

// router.get('/:id', catchAsync(campgrounds.showCampground));



// router.put('/:id',isLoggedIn,isAuthor,validateCampground,catchAsync(campgrounds.updateCampground));


// router.delete('/:id',isAuthor, isLoggedIn,catchAsync(campgrounds.deleteCampground));


module.exports = router;

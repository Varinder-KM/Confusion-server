const express = require('express');
const auth = require('../Authantication');
const bodyParser = require('body-parser');
const multer = require('multer');

var storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, 'public/images');
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const imageFileFilter = (req, file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpag|png|gif)$/)){
        return cb(new Error("You can upload only image file"));
    }
    else{
        cb(null, true);
    }
}

const upload = multer({storage: storage, fileFilter: imageFileFilter});

const UploadRouter = express.Router();

UploadRouter.route('/')
.get(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload');
})
.post(auth.verifyUser, auth.verifyAdmin, upload.single('imageFile'), (req, res) =>{
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.json(req.file);
})
.put(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload');
})
.delete(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /imageUpload');
});



module.exports = UploadRouter;
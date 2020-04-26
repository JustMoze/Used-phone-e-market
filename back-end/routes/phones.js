const { Phone, validate } = require('../models/phones');
const auth = require('../middleware/auth');
const express = require('express');
const validateObjectId = require('../middleware/validateObjectId');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, files, callBack) {
        callBack(null, './uploads/');
    },
    filename: function (req, file, callBack) {
        callBack(null, file.originalname);
    }
});
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },
    fileFilter: fileFilter
});
const router = express.Router();

router.get('/', async (req, res) => {
    const phones = await Phone.find().select('-').sort('name');
    res.send(phones);
});

router.post('/', [auth], upload.array('images', 7), async (req, res) => {
    console.log('re files -', req.files);
    console.log('request body - ', req.body);
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const imageArray = [];
        req.files.map((image) => {
            const correctPath = String(image.path);
            imageArray.push({ path: correctPath.replace('\\', '/') });
        });
        const phone = new Phone({
            brand: req.body.brand,
            model: req.body.model,
            screenSize: req.body.screenSize,
            RAMsize: req.body.RAMsize,
            state: req.body.state,
            storageSize: req.body.storageSize,
            color: req.body.color,
            price: req.body.price,
            images: imageArray,
            creatorID: req.body.creatorID
        });
        await phone.save();
        res.send(phone);
    } catch (error) {
        console.log('Occured eror', error);
    }
});
// front check if user id matches phone creator id
router.delete('/:id', [auth], async (req, res) => {
    const phone = await Phone.findByIdAndDelete(req.params.id);

    if (!phone)
        return res.status(400).send('The movie with given ID was not found');

    res.send(phone);
});
router.get('/:id', validateObjectId, async (req, res) => {
    console.log('req paramas', req.params);
    const phone = await Phone.findById(req.params.id).select('-__v');

    if (!phone) {
        return res.status(404).send('The movie with given ID was not found');
    }
    res.send(phone);
});

module.exports = router;

const { Phone, validate } = require('../models/phones');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const phones = await Phone.find().select('-').sort('name');
    res.send(phones);
});

router.post('/', [auth], async (req, res) => {
    console.log('request body - ', req.body);
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const imageArray = [];
        req.body.images.map((image) => {
            imageArray.push(image);
        });
        console.log('Image array', imageArray);
        const phone = new Phone({
            brand: req.body.brand,
            model: req.body.model,
            screenSize: req.body.screenSize,
            RAMsize: req.body.RAMsize,
            state: req.body.state,
            storageSize: req.body.storageSize,
            color: req.body.color,
            price: req.body.price,
            images: req.body.images,
            creatorID: req.body.creatorID
        });
        await phone.save();
        res.send(phone);
    } catch (error) {
        console.log('Occured eror', error);
    }
});

module.exports = router;

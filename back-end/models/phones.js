const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;
const { schema } = require('./photo');

const phoneSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    screenSize: {
        type: Number,
        required: true,
        min: 0
    },
    RAMsize: {
        type: Number,
        required: true,
        min: 0
    },
    state: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    storageSize: {
        type: Number,
        required: true,
        min: 0
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    images: [schema],
    creatorID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Phone = mongoose.model('Phone', phoneSchema);
function validatePhone(phone) {
    const schema = {
        brand: Joi.string().required(),
        model: Joi.string().min(2).required(),
        screenSize: Joi.number().positive().required(),
        RAMsize: Joi.number().positive().required(),
        state: Joi.string().required(),
        storageSize: Joi.number().positive().required(),
        color: Joi.string().required(),
        price: Joi.number().positive().required(),
        images: Joi.array().items(
            Joi.object({
                path: Joi.string()
            })
        ),
        creatorID: Joi.string().required()
    };
    return Joi.validate(phone, schema);
}

exports.Phone = Phone;
exports.validate = validatePhone;

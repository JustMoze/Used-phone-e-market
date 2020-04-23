const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {type: String, minlength: 5, maxlength: 25, required: true},
    hash: {type: String, required: true},
    email: {type: String, validate: {validator: () => Promise.resolve(false), message: 'Email validation failed'}},
    createdDate: {type: Date, default: Date.now}
});

schema.set('toJSON', {virtuals: true});
module.exports = mongoose.model('User', schema);

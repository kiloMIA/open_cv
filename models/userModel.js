let mongoose = require('mongoose');
let schema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },
        lastname: {
            type: String,
            maxlength: 32,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
    password: {
        type: String,
        required: true
    }
});
let userModel = new mongoose.model('User', schema);
module.exports = userModel;
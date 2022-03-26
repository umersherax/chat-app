const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    isAdmin : {
        type: Boolean,
        required: true,
        default: false
    },
},
{
    collection: 'user-data'
}
);

const modal = mongoose.model('UserData', User);

module.exports = modal;

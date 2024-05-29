const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    itemId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }, 
    time: {
        type: String,
    }, 
    date: {
        type: String,
    }, 
    status: {
        type: Number,
        required: true
    }, 
    
}, {timestamps: true})


module.exports = mongoose.model('Order', itemSchema)
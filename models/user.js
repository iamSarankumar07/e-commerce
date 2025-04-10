const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    wishList: [
        {
            productId: { 
                type: String, 
                required: false 
            },
            title: { 
                type: String, 
                required: false 
            },
            size: { 
                type: String, 
                required: false 
            },
            price: { 
                type: Number, 
                required: false 
            },
            quantity: { 
                type: Number, 
                required: false 
            },
            imageUrl: { 
                type: String, 
                required: false 
            },
        },
    ],
    cart: [
        {
            productId: { 
                type: String, 
                required: false 
            },
            title: { 
                type: String, 
                required: false 
            },
            size: { 
                type: String, 
                required: false 
            },
            price: { 
                type: Number, 
                required: false 
            },
            quantity: { 
                type: Number, 
                required: false 
            },
            imageUrl: { 
                type: String, 
                required: false 
            },
        },
    ],
    accessToken: {
        type: String
    },
    otp: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
});

  

module.exports = mongoose.model('user', userSchema)
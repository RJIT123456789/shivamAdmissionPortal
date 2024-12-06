const mongoose = require('mongoose')

// define schema
const ContectSchema = new mongoose.Schema({
    First_name: {
        type: String,
        require: true
    },
    Last_Name: {
        type: String,
        require: true
    },
    User_Name: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true
    },
    Address_1: {
        type: String,
        require: true
    },
    Address_2: {
        type: String,
        require: true
    },
    Country: {
        type: String,
        require: true
    },
    State: {
        type: String,
        require: true
    },
    
    
}, { timestamps: true })

const ContectModel = mongoose.model('contect', ContectSchema)
module.exports = ContectModel
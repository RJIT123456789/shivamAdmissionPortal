const mongoose = require('mongoose')

// define schema
const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    collage: {
        type: String,
        require: true
    },
    course: {
        type: String,
        require: true
    },
    branch: {
        type: String,
        require: true
    },
    userid: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default:'Pending'
    },
    comment: {
        type: String,
    }
}, { timestamps: true })

const CourseModel = mongoose.model('course', CourseSchema)
module.exports = CourseModel
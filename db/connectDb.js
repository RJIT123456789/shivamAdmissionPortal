const mongoose = require('mongoose')
const local_url = 'mongodb://127.0.0.1:27017/AAD01'
const Live_url = 'mongodb+srv://Shivam123:shivam12345@shivam123.wa2gb.mongodb.net/admissionPortal?retryWrites=true&w=majority&appName=Shivam123'

const connectdb = () => {

    return (
        mongoose
            .connect(Live_url)
            .then(() => {
                console.log('connected succrssfully')
            })
            .catch((error) => {
                console.log(error)
            })
    )
    // return mongoose.connect(url)
    // .then(() => {
    //     console.log('connected succrssfully')
    // })
    // .catch((error) => {
    //     console.log('error')
    // })
}


module.exports = connectdb
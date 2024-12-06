const jwt = require('jsonwebtoken')

const UserModal = require('../Model/user')

const CheckUserAuth = async (req, res, next) => {
    // console.log('Hello user')
    const { token } = req.cookies
    // console.log(token)
    if (!token) {
        req.flash('error', 'Unautharized user, Please login!')
        res.redirect('/')
    } else {
        const verify_token = jwt.verify(token, 'Shivamsinghchauhan799')
        const data = await UserModal.findOne({ _id: verify_token.id })
        // console.log(data)
        req.user = data
        //    console.log(verify_token)
        next();
    }
}

module.exports = CheckUserAuth
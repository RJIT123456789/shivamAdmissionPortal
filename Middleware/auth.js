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

// const jwt = require('jsonwebtoken');
// const UserModal = require('../Model/user');

// const CheckUserAuth = async (req, res, next) => {
//     const { token } = req.cookies;

//     if (!token) {
//         req.flash('error', 'Unauthorized user, Please login!');
//         return res.redirect('/');
//     }

//     try {
//         // Verify token
//         const verify_token = jwt.verify(token, 'Shivamsinghchauhan799');

//         // Find user by the token's decoded ID
//         const data = await UserModal.findOne({ _id: verify_token.id });
        
//         if (!data) {
//             req.flash('error', 'User not found, Please login again!');
//             return res.redirect('/');
//         }

//         // Attach user data to the request
//         req.user = data;

//         // Proceed to the next middleware or route handler
//         next();

//     } catch (error) {
//         if (error.name === 'TokenExpiredError') {
//             req.flash('error', 'Session expired, Please login again!');
//         } else if (error.name === 'JsonWebTokenError') {
//             req.flash('error', 'Invalid token, Please login again!');
//         } else {
//             req.flash('error', 'Authentication error, Please try again!');
//         }

//         return res.redirect('/');
//     }
// };

// module.exports = CheckUserAuth;

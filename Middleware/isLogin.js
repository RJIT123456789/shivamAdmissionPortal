const islogin = async (req, res, next) => {
    // console.log('Hello user')
    const { token } = req.cookies
    // console.log(token)
    if (token) {
        res.redirect('/home')
    }
    next();
}

module.exports = islogin
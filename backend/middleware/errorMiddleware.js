const dotenv = require("dotenv").config()


const errorHandler = (err, req, res, next) => {
    res.statusCode = 500
    res.json({ code: res.statusCode, message: err.message, errStack: process.env.NODE_ENV == 'development' ? err.stack : null })
    next()


}
module.exports = { errorHandler }
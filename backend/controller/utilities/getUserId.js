const jwt = require("jsonwebtoken")

//get signed in user id 
function getUserId(req) {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        const headers = { ...req.headers }
        const token = headers.authorization.split(" ")[1]
        const user = jwt.decode(token)
        if (user) {
            return user.id
        } else {
            throw new Error("invalid token")
        }
    }
    else { throw new Error("not autherized") }
}
module.exports = getUserId
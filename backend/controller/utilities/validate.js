// @desc validate if user infos provided while register
// @route POST /api/user/register
function isValidRegister(req) {
    const { userName, email, password } = req.body
    if (userName && email && password) {
        return true
    }
    else {
        return false
    }
}

// @desc validate if user infos provided while login
// @route POST /api/user/login
function isValidLoign(req) {
    const { email, password } = req.body
    if (email && password) {
        return true
    }
    else {
        return false
    }
}


module.exports = { isValidRegister, isValidLoign }
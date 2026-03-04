const crypto = require("crypto")
const generateString = (num=6)=>{
    const string = crypto.randomBytes(num).toString("hex") // abcdef0123456789
    return string
}

module.exports = generateString
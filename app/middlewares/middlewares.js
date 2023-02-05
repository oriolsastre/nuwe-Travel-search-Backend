const { detectChinese } = require('../helpers/language')

const checkLength = (req,res,next) => {
    const input = req.params.city;
    /* Since chinese kanjis can have more meaning than a single character, a short chinese input can already be meaningful to search for a city */
    if(detectChinese(input)) next()
    if(input.length>=3) next()
    res.status(400).json({error: "Input too short"})
}

const MWs = [checkLength]

module.exports = { MWs }
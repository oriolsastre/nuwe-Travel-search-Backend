

module.exports = (req,res) => {
    const citySearch = req.params.city
    res.status(200).json({input: citySearch})
}
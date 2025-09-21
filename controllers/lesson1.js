const curtisRoute = (req, res) => {
    res.send('Curtis Stones');
};
const rachelRoute = (req, res) => {
    res.send('Rachel Stones');
};

module.exports = { curtisRoute, rachelRoute };
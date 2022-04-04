const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function (req, res, next) { // Get token from headerh

    const userToken = req.header('x-auth-token');


    if (! userToken) {
        return res.status(401).json({msg: 'No token auth denied'});
    }

    // Verify Token

    try {
        const decoded = jwt.verify(userToken, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: "TOken not valid"});
    }
}

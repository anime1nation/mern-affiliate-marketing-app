const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function (req, res, next) { // Get token from headerh

    const adminToken = req.header('x-admin-token');

    // check if not token

    if (! adminToken) {
        return res.status(401).json({msg: 'No token auth denied'});
    }

    // Verify Token

    try {
        const decoded = jwt.verify(adminToken, config.get('jwtSecret'));

        req.admin = decoded.admin;
        next();
    } catch (err) {
        res.status(401).json({msg: "TOken not valid"});
    }
}

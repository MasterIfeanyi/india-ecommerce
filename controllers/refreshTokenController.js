const User = require('../models/User');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
    // check for the presence of a cookie
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(401); //unAuthorized
    console.log("reached here");
    const refreshToken = cookies.jwt;

    // find the user using refresh token
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.UserInfo.username) return res.sendStatus(403);

            const roles = Object.values(foundUser.roles).filter(Boolean); // remove null values

            // create a new access token
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": decoded.UserInfo.id,
                        "username": decoded.UserInfo.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30m' }
            );
            res.json({ roles, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }
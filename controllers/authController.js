const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();


const User = require("../models/User");

// Generate JWT
const generateJWT = (username, roles, id) => {
    return jwt.sign(
        {
            "UserInfo": {
                id,
                username,
                roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "2m" }
    )
}

const handleLogin = async (req, res) => {
    
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ "message": "please add a username" });
    
    // find the particular user
    const foundUser = await User.findOne({ username: user }).exec();
    if (!foundUser) return res.sendStatus(401); // unAuthorized
    
    try {
        // evaluate Password
        const match = bcrypt.compare(foundUser.password, pwd);

        if (match) {
            // to remove null values from the roles object
            const roles = Object.values(foundUser.roles).filter(Boolean);


            // create new JWTs
            const accessToken = generateJWT(foundUser.username, roles, foundUser._id)

            const refreshToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": foundUser._id,
                        "username": foundUser.username,
                        roles
                    }
                },
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: "10m"}
            )

            // Saving refreshToken with current user
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            console.log(result);

            // saving refresh token in a cookie
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000 });

            res.json({ roles, accessToken });

        } else {
            res.sendStatus(401);  // unAuthorized
        }
    } catch (err) {
        res.status(500).json({ "message": err.message });
    }
}

module.exports =  {handleLogin} 
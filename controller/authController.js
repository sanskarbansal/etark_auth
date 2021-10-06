const User = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY || crypto.randomBytes(64).toString("hex");

/**
 *
 * This controller requires name, email and password in req.body.
 */
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) return res.status(403).json({ message: "User already exists", status: 0 });

        //Password get hashed because of middleware.
        const newUser = await User.create({
            name,
            email,
            password,
        });
        return res.json({
            message: "ok",
            status: 1,
        });
    } catch (err) {
        res.status(500).json({
            message: "Error while registering",
            status: -1,
        });
    }
};

/**
 * @example
 * ```js
 * //right credentials
 * {
 *      token:  ...,
 *      user: {
 *              name: ...,
 *              _id: ... ,
 *              email: ...
 *      }
 * }
 * // wrong credentials
 * {
 *      message: "Credentials don't match",
 *      status: 0
 * }
 * ```
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.comparePassword(password)) throw new Error("not found");
        const token = jwt.sign({ name: user.name, email: user.email }, jwtKey);
        return res.json({
            token,
            user: {
                name: user.name,
                id: user.id,
                email,
            },
        });
    } catch (error) {
        if (error.message == "not found") {
            return res.status(404).json({
                message: "Credentials don't match",
                status: 0,
            });
        }
        res.status(500).json({
            message: "Error while loging in",
            status: -1,
        });
    }
};

module.exports = {
    signUp,
    login,
};

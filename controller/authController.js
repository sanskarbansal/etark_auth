const User = require("../models/User");

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
        console.log(err);
        res.status(500).json({
            message: "Error while registering",
            status: -1,
        });
    }
};

const login = (req, res) => {};

module.exports = {
    signUp,
    login,
};

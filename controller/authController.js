const User = require("../models/User");

/**
 *
 * This controller requires name, email and password in req.body.
 */
const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) res.status(403).json({ message: "User already exists", status: 0 });

        //Password get hashed because of middleware.
        const newUser = await User.create({
            name,
            email,
            password,
        });
        res.json({
            message: "ok",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error while registering",
        });
    }
};

const login = (req, res) => {};

module.exports = {
    signUp,
    login,
};

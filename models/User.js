const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const _generateHash = (password) => {
    const salt = crypto.randomBytes(8).toString("hex");
    const key = crypto.scryptSync(password, salt, 64).toString("hex");
    return `${key}.${salt}`;
};

const _compare = (password, hashedPassword) => {
    try {
        const [hash, salt] = hashedPassword.split(".");
        const key = crypto.scryptSync(password, salt, 64).toString("hex");
        return key === hash;
    } catch (error) {
        throw new Error("Error while comparing password.");
    }
};

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        this.password = _generateHash(this.password);
        next();
    }
});

userSchema.methods.comparePassword = function (password, cb) {
    return _compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);

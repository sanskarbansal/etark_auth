const jwt = require("jsonwebtoken");
const verifyUser = async (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader) {
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            const decoded = jwt.verify(bearerToken, process.env.JWT_KEY);
            if (!decoded)
                return res.status(403).json({
                    message: "Token not valid.",
                });
            req.user = decoded;
            return next();
        } else {
            return res.status(403).json({
                message: "Please provide token in authorizaiton header",
                status: 0,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            status: -1,
        });
    }
};
module.exports = verifyUser;

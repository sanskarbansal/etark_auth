module.exports = {
    home: (req, res) => {
        try {
            const message = `${req.user.name} with email: ${req.user.email}, logged in successfully`;
            return res.json({ message: message });
        } catch (error) {
            return res.json({
                message: "Internal Server Error",
            });
        }
    },
};

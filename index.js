const express = require("express");
const mongoose = require("mongoose");
const crypto = require("crypto");
const PORT = process.env.PORT || 3000;

process.env.JWT_KEY = process.env.JWT_KEY || crypto.randomBytes(64).toString("hex");

const app = express();

app.use(express.json());

app.use(require("./router/authRouter"));
app.use(require("./router/homeRouter"));

const DB_URL = process.env.DB_CONNECTION_URL || "mongodb://localhost:27017/etark";

(async () => {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => {
            console.log("Server Successfully started on port: ", PORT);
        });
    } catch (err) {
        console.log("Error while starting the server.");
    }
})();

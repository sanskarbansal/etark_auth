const { home: homeController } = require("../controller/homeController");
const verifyUser = require("../middleware/authvalidation");

const router = require("express").Router();

router.get("/home", verifyUser, homeController);

module.exports = router;

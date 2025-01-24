const express = require("express")
const router = express.Router()
const {userLogin, userSignUp, getUser} = require("../controllers/user")
const verifyToken = require("../middleware/auth");

router.post("/signUp", userSignUp)
router.post("/login", userLogin, verifyToken)
router.get("/user/:id", getUser)

module.exports = router
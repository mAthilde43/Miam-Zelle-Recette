const express = require("express")
const authController = require("../controllers/auth.controller")

const router = express.Router()

router.get("/me", authController.getUser)
router.post("/register", authController.signUp)


module.exports = router
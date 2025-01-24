const express = require("express");
const authController = require("../controllers/auth.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/me", auth, authController.getUser);
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
// router.post("/logout", authController.signOut);
router.patch("/:id", auth, authController.updateUser);
router.delete("/:id", auth, authController.deleteUser);

module.exports = router;

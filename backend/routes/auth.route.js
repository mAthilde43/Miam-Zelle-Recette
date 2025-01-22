//importer module express
const express = require("express");
//importer auth.controller.js
const authController = require("../controllers/auth.controller");
//importer le middleware
const auth = require("../middleware/auth");

//créer le routeur
const router = express.Router();

router.get("/me", auth, authController.getUser);
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
// router.post("/logout", authController.signOut);
router.put("/:id", authController.updateUser);
router.delete("/:id", authController.deleteUser);

//exporter le routeur
module.exports = router;

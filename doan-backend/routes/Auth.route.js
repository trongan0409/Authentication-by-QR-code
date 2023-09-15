const express = require("express");
const router = express.Router();
const {
  RegisterController,
  LoginController,
  RefreshTokenController,
  LogoutController,
  Authorization,
} = require("../src/controllers/account");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.post("/refresh-token", RefreshTokenController);
router.delete("/logout", LogoutController);
router.get("/authorization", verifyAccessToken, Authorization);

module.exports = router;

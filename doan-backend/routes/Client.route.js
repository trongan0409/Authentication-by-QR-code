const express = require("express");
const {
  CreateQRCode,
  ShowCourseGrades,
} = require("../src/controllers/createQR.controller");
const {
  verifyAccessToken,
  verifyAccessTokenQR,
} = require("../helpers/jwt_helper");
const { SelectAccountWithId } = require("../src/controllers/account");
const router = express.Router();

router.post("/create-qr-code", verifyAccessToken, CreateQRCode);
router.post("/create-qr-code-login", CreateQRCode);
// router.post("/show-course-grades", verifyAccessToken, ShowCourseGrades);
router.post("/show-course-grades",  ShowCourseGrades);
router.post("/select-account", verifyAccessToken, SelectAccountWithId);

module.exports = router;

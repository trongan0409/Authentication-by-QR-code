const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../helpers/jwt_helper");
const { SelectAccount, UpdateStatusActiveUser, UpdateInfoUser, DeleteUserById } = require("../src/controllers/account");
const { SelectAllClass, UpdateStatusActiveClass } = require("../src/controllers/class.controller");
// const { SelectAccount } = require("../src/controllers/account");
// const {
//   InsertProduct,
//   SelectProduct,
// } = require("../src/controllers/product.controller");
// const {
//   InsertTermsOfService,
// } = require("../src/controllers/TermsOfService.controller");
// const {
//   InsertReturnPolicy,
// } = require("../src/controllers/returnPolicy.controller");

router.post("/select-account", verifyAccessToken, SelectAccount);
router.post('/update-status-user-active', verifyAccessToken, UpdateStatusActiveUser)
router.post('/update-info-user', verifyAccessToken, UpdateInfoUser)
router.post('/delete-user-by-id', verifyAccessToken, DeleteUserById)
router.post('/select-lop-hoc-phan', verifyAccessToken, SelectAllClass)
router.post('/update-status-class-active', verifyAccessToken, UpdateStatusActiveClass)
// router.post("/insert-product", verifyAccessToken, InsertProduct);
// router.post("/select-product", verifyAccessToken, SelectProduct);
// router.post(
//   "/insert-terms-of-service",
//   verifyAccessToken,
//   InsertTermsOfService
// );
// router.post("/insert-return-policy", verifyAccessToken, InsertReturnPolicy);

module.exports = router;

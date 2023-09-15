const { v4: uuidv4 } = require("uuid");
const {
  signAccessToken,
  verifyAccessTokenQR,
} = require("../../helpers/jwt_helper");
const { hashedPassword } = require("../../helpers/hashPassword");
const { conn } = require("../../config/dbConnect");
const CreateQRCode = async (req, res, next) => {
  try {
    const { userId, deadline } = req.body;
    const accessToken = await signAccessToken(userId.toString(), deadline);
    res.send({
      status: 200,
      data: {
        id: userId,
        token: accessToken,
      },
    });
  } catch (error) {
    res.send({
      status: error.status,
      message: error.message,
    });
  }
};
const ShowCourseGrades = async (req, res, next) => {
  try {
    const { userId } = req.body;
    var pool = await conn;
    await pool.query(
      `SELECT
      chi_tiet_LHP.diem_cc,
	  chi_tiet_LHP.diem_bt,
	  chi_tiet_LHP.giua_ky,
	  chi_tiet_LHP.cuoi_ky,
	  chi_tiet_LHP.diem_t4,
	  chi_tiet_LHP.diem_t10,
	  chi_tiet_LHP.diem_tong,
	  chi_tiet_LHP.diem_chu,
      informationUser.fullName,
      informationUser.email,
	  class.nameClass
    FROM chi_tiet_LHP
	INNER JOIN informationUser ON chi_tiet_LHP.idStudent = ${Number(
    userId
  )} AND informationUser.id = chi_tiet_LHP.idStudent
	INNER JOIN class ON class.id = chi_tiet_LHP.idLHP`,
      async function (err, { recordset }) {
        if (err) throw next(createError.BadRequest());
        res.send({
          status: 200,
          data: recordset,
        });
      }
    );
  } catch (error) {
    res.send({
      status: error.status,
      message: error.message,
    });
  }
};

module.exports = {
  CreateQRCode,
  ShowCourseGrades,
};

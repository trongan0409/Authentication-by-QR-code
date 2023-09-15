

const { conn } = require("../../config/dbConnect");

const SelectAllClass = async (req, res, next) => {
    try {
      var pool = await conn;
      await pool.query(
        `select 
            class.id,
            class.nameClass,
            class.list_student,
            class.active,
            lop_hoc_phan.TC,
            lop_hoc_phan.tiet,
            lop_hoc_phan.tuan,
            lop_hoc_phan.nhom,
            informationUser.fullName as nameTeacher
        from class INNER JOIN informationUser ON informationUser.id = class.idUser
        INNER JOIN lop_hoc_phan ON lop_hoc_phan.idClass = class.id`,
        function (err, { recordset }) {
          if (err) throw createError.BadRequest();
          if (recordset.length === 0)
            return res.send({
              error: {
                status: 409,
                message: `Data load failed`,
              },
            });
          res.send({
            status: 200,
            data: recordset
          });
        }
      );
    } catch (error) {
      next(error);
    }
  };
  const UpdateStatusActiveClass = async (req, res, next) => {
    const {classId, status} = req.body;

    try {
      var pool = await conn;
      await pool.query(
        `UPDATE
        class
        SET active = ${Number(status)} WHERE id = ${Number(classId)}`,
        function (err, recordset) {
          if (err) return next(createError.BadRequest());
          res.send({
            status: 200, 
            message: 'Success'
          })
        }
      ); 
    } catch (error) {
      res.send({
        status: error.status,
        message: error.message
      })
    }
}

  module.exports = {
    SelectAllClass,
    UpdateStatusActiveClass
  };
  
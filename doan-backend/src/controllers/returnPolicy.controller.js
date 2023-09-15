const { conn } = require("../../config/dbConnect");
const createError = require("http-errors");
const InsertReturnPolicy = async (req, res, next) => {
  try {
    const { html } = req.body;

    var pool = await conn;
    await pool.query(
      `INSERT INTO returnPolicy(
          html
        )
        VALUES (
          N'${html}'
        )
        SELECT * FROM returnPolicy
        `,
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
      error: {
        status: error.status,
        message: error.message,
      },
    });
  }
};
const SelectReturnPolicyLastRow = async (req, res, next) => {
  try {
    var pool = await conn;
    await pool.query(
      `	SELECT TOP 1 * 
        FROM returnPolicy
        ORDER BY id DESC;
        `,
      async function (err, { recordset }) {
        if (err) throw next(createError.BadRequest());
        res.send({
          status: 200,
          data: recordset?.[0],
        });
      }
    );
  } catch (error) {
    res.send({
      error: {
        status: error.status,
        message: error.message,
      },
    });
  }
};
module.exports = {
  InsertReturnPolicy,
  SelectReturnPolicyLastRow,
};

const { conn } = require("../../config/dbConnect");
const localtionVN  = require('../../json/location.json')
const {
  hashedPassword,
  isValidPassword,
} = require("../../helpers/hashPassword");
const {
  authSchema,
  loginValidate,
} = require("../../helpers/validation_schema");
const createError = require("http-errors");
const {
  signAccessToken,
  signRefreshAccessToken,
  verifyRefreshToken,
} = require("../../helpers/jwt_helper");

const RegisterController = async (req, res, next) => {
  try {
    const { username, password, role, fullName, email } =
      await authSchema.validateAsync(req.body);
    const hashPassword = hashedPassword(password);
    var pool = await conn;
    await pool.query(
      `SELECT
          COUNT(account.username) AS username,
          COUNT(informationUser.email) AS email
            FROM account
            INNER JOIN informationUser ON informationUser.email = N'${email}' OR account.username = N'${username}'`,
      async function (
        err,
        { recordset: [{ username: checkUsername, email: checkEmail }] }
      ) {
        if (err) throw createError.BadRequest();
        if (checkUsername !== 0 || checkEmail !== 0)
          return res.send({
            error: {
              status: 404,
              message: `E-mail: ${email} or Username: ${username} is already been registered.`,
            },
          });
        if (email && username && role && hashPassword)
          await pool.query(
            `
              INSERT INTO informationUser(fullName, email)
              VALUES ( N'${fullName}', N'${email}')
              INSERT INTO account (idUser, username, password, role)
              VALUES ((SELECT id FROM informationUser WHERE email = N'${email}'),
                  N'${email}',
                  N'${hashPassword}',
                  N'${role}')
              SELECT
                  account.id,
                  account.username,
                  account.idUser,
                  account.role,
                  informationUser.idClass,
                  informationUser.fullName,
                  informationUser.email,
                  informationUser.avatar,
                  informationUser.address,
                  informationUser.birthDay,
                  informationUser.sex,
                  informationUser.phone,
                  informationUser.cccd
              FROM account 
              INNER JOIN informationUser 
              ON account.idUser = informationUser.id 
              AND informationUser.email = N'${email}' 
              AND account.username = N'${username}';
            `,
            async function (err, { recordset }) {
              if (err) throw next(createError.BadRequest());
              const accessToken = await signAccessToken(
                recordset?.[0]?.id?.toString(),
                "1h"
              );
              const refreshToken = await signRefreshAccessToken(
                recordset?.[0]?.id?.toString()
              );
              res.send({
                accessToken,
                refreshToken,
                userData: recordset?.[0],
              });
            }
          );
      }
    );
  } catch (error) {
    if (error.isJoi) error.status = 422;
    res.send({
      error: {
        status: error.status,
        message: error.message,
      },
    });
  }
};

const LoginController = async (req, res, next) => {
  try {
    const { username, password } = await loginValidate.validateAsync(req.body);
    var pool = await conn;
    await pool.query(
      `SELECT
      account.id,
      account.username,
      account.password,
      account.idUser,
      account.role,
      informationUser.fullName,
      informationUser.email,
      informationUser.avatar,
      informationUser.address,
      informationUser.birthDay,
      informationUser.sex,
      informationUser.phone,
      informationUser.cccd
    FROM account INNER JOIN informationUser ON account.username = N'${username}' AND informationUser.id = account.idUser`,
      async function (err, { recordset }) {
        if (err) throw createError.BadRequest();
        if (recordset.length === 0)
          return res.send({
            error: {
              status: 409,
              message: `User not registered.`,
            },
          });
        const checkPassword = isValidPassword(
          password,
          recordset?.[0]?.password
        );

        if (!checkPassword)
          return next(createError.Unauthorized("Password not valid"));
        const accessToken = await signAccessToken(
          recordset?.[0]?.id.toString(),
          "1d"
        );
        const refreshToken = await signRefreshAccessToken(
          recordset?.[0]?.id.toString()
        );

        res.send({ accessToken, refreshToken, userData: recordset?.[0] });
      }
    );
  } catch (error) {
    if (error.isJoi)
      res.send({
        message: "Fail",
      });
  }
};

const Authorization = async (req, res, next) => {
  res.send({
    status: 200,
    message: "success",
  });
};
const RefreshTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) throw next(createError.BadRequest());
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId, "1h");
    const _refreshToken = await signRefreshAccessToken(userId);
    res.send({ accessToken, refreshToken: _refreshToken });
  } catch (error) {
    next(error);
  }
};
const LogoutController = async (req, res, next) => {};

const SelectAccount = async (req, res, next) => {
  const {roleSelect} = req.body
  try {
    var pool = await conn;
    await pool.query(
      `SELECT
      informationUser.id,
      informationUser.fullName,
      informationUser.email,
      informationUser.idClass,
      informationUser.avatar,
      informationUser.address,
      informationUser.birthDay,
      informationUser.sex,
      informationUser.phone,
      informationUser.cccd,
      informationUser.active
    FROM informationUser LEFT JOIN account ON account.idUser = informationUser.id WHERE account.role = N'${roleSelect}'`,
      function (err, { recordset }) {
        if (err) throw createError.BadRequest();
        if (recordset.length === 0)
          return res.send({
            error: {
              status: 409,
              message: `Data load failed`,
            },
          });
          const newData = []  
          recordset?.map((record) => {
            const {address, ...newDataRecord} = record
            const newAddress = address?.split('-')
            const tinh_tp = localtionVN.find(({code}) => code === newAddress?.[0])
            const quan_huyen = tinh_tp?.districts?.find(({id}) => id === newAddress?.[1])
            const phuong_xa = quan_huyen?.wards?.find(({id}) => id === newAddress?.[2])
            newData.push({
              ...newDataRecord, 
              address, 
              newAddress: `${tinh_tp?.name ?? '___'}-${quan_huyen?.name ?? '___'}-${phuong_xa?.name ?? '___'}-${newAddress?.[3] ?? '___'}`,
              tinh_tp:tinh_tp?.code,
              quan_huyen: quan_huyen?.name,
              phuong_xa: phuong_xa?.name,
              address_detail: newAddress?.[3]
            })
          })
        res.send({
          status: 200,
          data: newData
        });
      }
    );
  } catch (error) {
    next(error);
  }
};
const SelectAccountWithId = async (req, res, next) => {
  try {
    var pool = await conn;
    await pool.query(
      `SELECT
        informationUser.fullName
      FROM informationUser WHERE  id = ${Number(req.body.userId)}`,
      function (err, { recordset }) {
        if (err) throw createError.BadRequest();
        if (recordset.length === 0)
          return res.send({
            error: {
              status: 409,
              message: `Data load failed`,
            },
          });
        res.send(recordset?.[0]);
      }
    );
  } catch (error) {
    next(error);
  }
};


const UpdateStatusActiveUser = async (req, res, next) => {
    const {userId, status} = req.body;

    try {
      var pool = await conn;
      await pool.query(
        `UPDATE
        informationUser
        SET active = ${Number(status)} WHERE id = ${Number(userId)}`,
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

const UpdateInfoUser = async (req, res, next) => {
  const {parameters, userId} = req.body
  try {
    const keyParameters = Object.keys(parameters)
    var pool = await conn;
    await pool.query(
      `UPDATE
        informationUser
        SET ${keyParameters.map((key) => `${key}=N'${parameters[key]}'`)}
        WHERE id = ${Number(userId)}`,
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
const DeleteUserById = async (req, res, next) => {
  const {userId} = req.body
  try {
    var pool = await conn;
    await pool.query(
      `DELETE
        informationUser
        WHERE id = ${Number(userId)}`,
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
  RegisterController,
  LoginController,
  RefreshTokenController,
  LogoutController,
  Authorization,
  SelectAccount,
  SelectAccountWithId,
  UpdateStatusActiveUser,
  UpdateInfoUser,
  DeleteUserById
};

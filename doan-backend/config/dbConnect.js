var sql = require("mssql");

var config = {
  user: "sa",
  password: "123456",
  server: "ANPC",
  database: "ad",
  // driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    instanceName: "",
    encrypt: true,
  },
  port: 9999,
  // port: 51647,
};
var conn = new sql.connect(config, function (err) {
  if (err) console.log("Error Connected SQL Server: ", err);
  var request = new sql.Request();
  return request;
});

module.exports = {
  conn: conn,
  sql: sql,
};

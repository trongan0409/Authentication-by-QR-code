const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const createError = require("http-errors");

const config = require("./config/config");
const cors = require("cors");
const router = require("./routes");
const corsOptions = require("./config/corsOption");
const { hashedPassword } = require("./helpers/hashPassword");
const http  = require('http');
const serverIO = require('socket.io')

require("./helpers/generate_keys");



app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router.routes);
app.use("/image", express.static("upload_images"));
app.use("/json-data", express.static("json"));


const PORT = config.port || 8080;

const server = app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});
const io = serverIO(server, {
  cors: corsOptions
})
global.onlineUser  = new Map()

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUser.set(userId, socket.id)
    
  })
  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUser.get(data.to)
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.message)
    }
  })
  socket.on('status', (data) => {
    const sendUserSocket = onlineUser.get(data.to)
    if(sendUserSocket) {
      socket.to(sendUserSocket).emit('status', {status: data.message, to: data.from})
    }
  })
})
app.use(async (req, res, next) => {
  next(createError.NotFound());
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

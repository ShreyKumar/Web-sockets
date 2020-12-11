const http = require("http")

const socketio = require('socket.io')

const server = http.createServer((req, res) => {
  res.end("Connected")
})

const io = socketio(server, {
  cors: {
    cors: {
      origin: "file:///Users/shreyanshkumar/projects/Web-sockets/ws.html",
      methods: ["GET", "POST"]
    }
  }
})

io.on('connection', (socket, req) => {
  socket.emit('welcome', 'hello from server!')

  socket.on('message', (msg) => {
    console.log(msg)
  })

})


server.listen(8080)
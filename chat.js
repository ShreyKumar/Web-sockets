// Server
const express = require('express')
const app = express()
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(9000)
socketio(expressServer)

const io = socketio(expressServer)


io.on('connection', (socket) => {
  socket.emit('messageFromServer', { data: 'Welcome to the socketio server' })
  socket.on('messageToServer', (dataFromClient) => {
    console.log(dataFromClient)
  })

  socket.join('level1')
  io.to('level1').emit('joined', `${socket.id} has joined the level 1 room`)
})

io.of('/admin').on('connection', (socket) => {
  console.log('Admin namespace')
  io.of('/admin').emit('welcome', 'welcome to the admin channel')
})

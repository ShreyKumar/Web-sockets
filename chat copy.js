// Server
const express = require('express')
const app = express()
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(9000)
socketio(expressServer)

const io = socketio(expressServer)

let connected = 0

io.on('connection', (socket) => {
  connected += 1
  console.log(socket.id, connected)
  io.emit('connectionStatus', { connected })
  
  socket.on('disconnect', () => {
    console.log('disconnected')
    connected -=  1
    io.emit('connectionStatus', { connected })
  })

  socket.on('newMessageToServer', (msg) => {
    console.log(msg)
    io.emit('messageToClients', {text: msg.text, from: socket.id})
  })

  io.of('/admin').emit('welcome', 'welcome to the admin channel from the main channel')
})

io.of('/admin').on('connection', (socket) => {
  console.log('Admin namespace')
  io.of('/admin').emit('welcome', 'welcome to the admin channel')
})

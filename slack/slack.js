// Server
const express = require('express')
const app = express()
const socketio = require('socket.io')
const expressServer = app.listen(9000)

socketio(expressServer)
app.use(express.static(__dirname + '/public'))

const io = socketio(expressServer)
let namespaces = require('./data/namespaces')

let connectedCounter = 0

io.on('connection', (socket) => {
  let nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint
    }
  })

  socket.emit('nsList', nsData)
  connectedCounter += 1

  socket.on('disconnect', () => {
    connectedCounter -= 1
  })

})

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on('connection', (socket) => {
    console.log(`${socket.id} has joined ${namespace.endpoint}`)
    socket.emit('nsRoomLoad', namespace.rooms)

    socket.on('joinRoom', (roomToJoin, numberOfUsers) => {
      socket.join(roomToJoin)

      // console.log(io.sockets.clients(roomToJoin))
      numberOfUsers(connectedCounter)

      const nsRoom = namespace.rooms.find((room) => room.roomTitle === roomToJoin)

      console.log({ nsRoom })
      socket.emit('historyCatchUp', nsRoom.history)
      console.log({ connectedCounter })
      io.of(namespace.endpoint).in(roomToJoin).emit('updateMembers', connectedCounter)
    })

    socket.on('newMessageToServer', (msg) => {
      console.log(msg)
      const fullMsg = {
        text: msg.text,
        time: Date.now(),
        username: 'shreykumar',
        avatar: 'https://via.placeholder.com/30'
      }
      const roomTitle = Array.from(socket.rooms.values())[1]
      const nsRoom = namespace.rooms.find((room) => room.roomTitle === roomTitle)
      nsRoom.addMessage(fullMsg)
      console.log(nsRoom)

      io.of(namespace.endpoint).to(roomTitle).emit('messageToClients', fullMsg)
    })
  })
})


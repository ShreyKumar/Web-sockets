const socket = io('http://localhost:9000')
const socket2 = io('http://localhost:9000/admin') // admin namespace

socket.on('messageFromServer', (dataFromServer) => {
  console.log(dataFromServer)
  socket.emit('dataToServer', { data: 'Data from the Client!' })
})

socket.on('joined', (msg) => {
  console.log(msg)
})

socket2.on('welcome', (dataFromServer) => {
  console.log(dataFromServer)
})

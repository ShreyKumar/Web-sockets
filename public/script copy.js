const socket = io('http://localhost:9000')
const socket2 = io('http://localhost:9000/admin')


socket.on('connect', () => {
  document.querySelector('#your-id').innerHTML += socket.id.slice(0, 5)
})

socket2.on('connect', () => {
  console.log(socket2.id)
})

socket2.on('welcome', (msg) => {
  console.log(msg)
})

document.querySelector('#message-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const newMessage = document.querySelector('#user-message').value
  document.querySelector('#user-message').value = ''

  socket.emit('newMessageToServer', { text: newMessage })
})

socket.on('connectionStatus', (msg) => {
  document.querySelector('#count').innerHTML = msg.connected
})

socket.on('messageToClients', (msg) => {
  console.log(msg)
  const messagesElem = document.querySelector('#messages')
  const fragment = document.createDocumentFragment()
  const li = document.createElement('li')
  li.textContent = `${msg.from.slice(0, 5)}: ${msg.text}`
  fragment.appendChild(li)
  messagesElem.appendChild(fragment)
})
function joinNs(endpoint) {
  nsSocket = io(`http://localhost:9000${endpoint}`)
  nsSocket.on('nsRoomLoad', (nsRooms) => {
    let roomList = document.querySelector('.room-list')
    // roomList.innerHTML = ""
    console.log({ nsRooms })

    nsRooms.forEach((room) => {
      const li = document.createElement('li')

      const span = document.createElement('span')

      let glpyh
      if (room.privateRoom) {
        glpyh = 'lock'
      } else {
        glpyh = 'globe'
      }

      span.setAttribute('class', `glyphicon glyphicon-${glpyh}`)

      const spanText = document.createElement('span')
      spanText.innerText += room.roomTitle

      li.addEventListener('click', (e) => {
        console.log("Someone clicked on ", e.target.innerHTML)
      })

      li.appendChild(span)
      li.appendChild(spanText)
      roomList.appendChild(li)
    })

    const topRoomName = nsRooms[0].roomTitle
    console.log(topRoomName)
    joinRoom(topRoomName)

  })

  nsSocket.on('messageToClients', (msg) => {
    console.log(msg)
    const messages = document.querySelector('#messages')
    messages.appendChild(buildHTML(msg))
  })

  document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault()
    const newMessage = document.querySelector('#user-message').value
    document.querySelector('#user-message').value = ''
    nsSocket.emit('newMessageToServer', { text: newMessage })
  })

}

const buildHTML = (msg) => {
  console.log(msg)
  const li = document.createElement('li')
  const imagePlaceHolder = document.createElement('div')
  imagePlaceHolder.setAttribute('class', 'user-image')

  const placeholder = document.createElement('img')
  placeholder.setAttribute('src', msg.avatar)
  imagePlaceHolder.appendChild(placeholder)

  const messsageElem = document.createElement('div')
  messsageElem.setAttribute('class', 'user-message')
  
  const metaDataElem = document.createElement('div')
  metaDataElem.setAttribute('class', 'user-name-time')
  metaDataElem.innerText = `${msg.username} `
  const span = document.createElement('span')
  span.innerText += new Date(msg.time).toLocaleString()
  metaDataElem.appendChild(span)

  const msgText = document.createElement('div')
  msgText.innerText += msg.text

  messsageElem.appendChild(metaDataElem)
  messsageElem.appendChild(msgText)

  li.appendChild(imagePlaceHolder)
  li.appendChild(messsageElem)

  return li
}
function joinRoom(roomName) {
  nsSocket.emit('joinRoom', roomName, (newMemberCount) => {
    const span = document.createElement('span')
    span.innerText += newMemberCount
    document.querySelector('.curr-room-num-users').appendChild(span)
  })

  nsSocket.on('historyCatchUp', (history) => {
    const messages = document.querySelector('#messages')

    history.forEach((msg) => {
      const newMsg = buildHTML(msg)
      messages.appendChild(newMsg)
    })
  })
}
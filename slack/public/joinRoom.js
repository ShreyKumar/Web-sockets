function joinRoom(roomName) {
  nsSocket.emit('joinRoom', roomName, (newMemberCount) => {
    const span = document.createElement('span')
    span.setAttribute('class', 'count')
    span.innerText += newMemberCount
    document.querySelector('.curr-room-num-users').appendChild(span)
  })

  nsSocket.on('historyCatchUp', (history) => {
    const messages = document.querySelector('#messages')

    history.forEach((msg) => {
      const newMsg = buildHTML(msg)
      messages.appendChild(newMsg)
    })
    messages.scrollTo(0, messages.scrollHeight)
  })

  nsSocket.on('updateMembers', (newCount) => {
    const countElem = document.querySelector('.count')
    countElem.innerText = newCount

    const currRoomText = document.querySelector('.curr-room-text')
    currRoomText.innerText = roomName
  })
}
function joinRoom(roomName) {
  nsSocket.emit('joinRoom', roomName, (newMemberCount) => {
    const span = document.createElement('span')
    span.innerText += newMemberCount
    document.querySelector('.curr-room-num-users').appendChild(span)
  })
}
const socket = io('http://localhost:9000')

let nsSocket = ''

socket.on('nsList', (nsData) => {
  console.log(nsData, "arrived")
  // update dom
  const namespacesDiv = document.querySelector('.namespaces')

  let namespacesChildren = new DocumentFragment()
  nsData.forEach((ns) => {
    console.log(ns.img)
    const div = document.createElement('div')
    div.className = 'namespace'
    div.addEventListener('click', (e) => {
      console.log(ns.endpoint)
    })

    const img = document.createElement('img')
    img.setAttribute('src', ns.img)
    div.appendChild(img)
    namespacesChildren.append(div)
  })

  namespacesDiv.append(namespacesChildren)

  joinNs('/wiki')

})

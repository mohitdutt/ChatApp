const socket = io()

// socket.on('countUpdated', (count) => {
//     console.log(`the count has been updated!`, count)
// })

// document.querySelector('#btn').addEventListener('click', () => {
//     console.log('clicked')
//     socket.emit('increment')
// })

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.inputMessage.value
    socket.emit('sendMessage', message, (error) => {
        debugger
        if (error) {
            debugger
            return console.log(error)
        }
        console.log('message delivered!!')
    })
})

document.querySelector('#shareLocation').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        let coords = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        socket.emit('geoLocation', coords, () => {
            console.log('location shared!!')
        })
    })
})

socket.on('message', (message) => {
    console.log(message)
})
const path = require('path')

const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const Filter = require('bad-words')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.port || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

let count = 0;
io.on('connection', (socket) => { // on user connect first
    console.log('web socket connected successfully!')

    // socket.emit('countUpdated', count)
    // socket.on('increment', () => {
    //     // socket.emit('countUpdated', count++)
    //     io.emit('countUpdated', count++)
    // })

    socket.emit('message', 'welcome You here..') // send message to you only!!

    socket.broadcast.emit('message', 'new user has been added!') //send  message to everonw except you

    socket.on('sendMessage', (message, callback) => {
        debugger
        const filter = new Filter()
        if (filter.isProfane(message)) {
            debugger
            console.log(filter)
            return callback('Profanity is not allowed!!')
        }
        io.emit('message', message) // send message to everyone including you
        callback()
    })

    socket.on('geoLocation', (coords, callback) => {
        socket.broadcast.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!!')
    })
})

server.listen(port, () => {
    console.log(`Server is ready at port:- ${port}!`)
})
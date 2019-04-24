const express =  require('express');
const app = express()
const path = require('path')

const SocketIO = require('socket.io')

// SETTINGS
app.set('port', process.env.PORT || 2000);

// static file

 app.use(express.static(path.join(__dirname, 'public')))



const server = app.listen(app.get('port'), () =>{
    console.log('server is running on port ', app.get('port'));
    
})

const io = SocketIO(server)

io.on('connection', (socket)=>{
    console.log('new connection',socket.id);

    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:message',data);
        
    })

    socket.on('chat:typing',(data) => {
        socket.broadcast.emit('chat:typing', data);
        
    })
})




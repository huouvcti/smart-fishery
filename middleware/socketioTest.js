

const SocketIO = require('socket.io');
 
module.exports = (server) => {
   
   const io = SocketIO(server, { path: '/socket.io' });
 
    io.on('connection', (socket) => {
        // const req = socket.request;
        console.log("socket connected");
 
        // disconnect
        socket.on('disconnect', () => {
            console.log('socket disconnected');
            clearInterval(socket.interval);
        });
    
        // err
        socket.on('error', (err) => {
            console.log(err);
        });
    
        //* 클라이언트로부터 메시지
        socket.on('reply', (data) => {
            console.log(data);
        });
    
        //* 클라이언트로 메세지 보내기
        
    });
};


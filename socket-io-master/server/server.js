const path=require('path');
const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const {realstring}= require('./utils/validation');
const port = process.env.PORT || 3000;
const pubpath=path.join(__dirname , '../public');
const {Users}= require('./utils/users')
const {generatemessage, generatelocationmessage}=require('./utils/message');
var app=express();
var server= http.createServer(app);
var io= socketio(server);
var users=new Users();
app.use(express.static(pubpath));



io.on('connection', (socket)=>{

    console.log('new user connected');
    socket.on('disconnect', ()=>{
var user=users.removeuser(socket.id);
if(user){
io.to(user.room).emit('updateuser', users.getuserlist(user.room))
io.to(user.room).emit('newmsg', generatemessage('Admin',`${user.name} has left`))

}
        
    });
   

   socket.on('join' , (params , callback)=>{
     console.log(realstring(params.name));
     console.log(params.name);
            if(!realstring(params.name) || !realstring(params.room)){

             return callback('is not string');
            }
            socket.join(params.room);
users.removeuser(socket.id);
users.addUser(socket.id , params.name , params.room);
io.to(params.room).emit('updateuser', users.getuserlist(params.room))

            socket.emit('newmsg',generatemessage('admin','welcome from admin :'));
            socket.broadcast.to(params.room).emit('newmsg', generatemessage('admin',`${params.name} joined`));
              callback();
            

   });


   



  socket.on('createmsg',(msg,callback)=>{
var user=users.getuser(socket.id);
if(user && realstring(msg.text))
{
  io.to(user.room).emit('newmsg',generatemessage(user.name ,msg.text));

}


callback(msg.from,msg.text);
  });

  socket.on('createlocationmsg', (data)=>{
    var user=users.getuser(socket.id);
if(user )
{
 
  io.to(user.room).emit('newlocationmsg', generatelocationmessage(user.name , data.latitude , data.longitude));
 

}
    
  });
   

    
});


server.listen(port,()=>{console.log('3000')});
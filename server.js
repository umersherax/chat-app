const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./database/user.modal');
const jwt = require('jsonwebtoken');



app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
var myRooms = [];

const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
});

app.get('/all-users', async (req, res) => {
   const all_users = await User.find();
   res.send(all_users);
});


app.post('/register', async (req, res)=>{
  try{
      const user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
      });
      if(user){
          const token = jwt.sign({name: user.name,email: user.email}, 'secret123');
          const newUser = {
            user: user._id,
            token
          }
          res.json({status: 'ok', newUser });
      }
  }catch(err){
      res.json({status: 'something went wrong', err})
  }
});

app.post('/login', async (req, res)=>{
  const {email, password} = req.body;
  try{
      const found = await User.findOne({ email , password });
      if(found){
          const token = jwt.sign({ 
              name: found.name,
              email: found.email
           } , 'secret123');
           const newUser = {
            user: found._id,
            token
          }
          res.json({status: "ok", newUser});
      }else{
          res.json({status: "User not foundzz"});
      }
  }catch(err){
      res.json({status: 'some thing went wrong', err})
  }
});



app.get('/get-info', async (req,res)=>{
  const token = req["headers"]["x-access-token"];
  try{
      const decode = jwt.verify(token, 'secret123');
      const info = await User.findOne({ email: decode.email })
      res.json({ info, valid: true });
  }catch(err){
      res.json({ valid: false, err })
  }
})

io.on('connection', (socket) => {
    socket.emit('welcome','welcome new user');

    socket.on('join-room',room=>{
      // if(!myRooms.includes(room)){
      //   myRooms.push(room);
      // }
      console.log("room joined",room)
      const msgTo = room.msgTo;
      socket.join(msgTo);
    });

    socket.on('message',(user)=>{
      console.log("sent message to room no",myRooms);
      io.to(user.msgTo).to(user.msgFrom).emit('rec',user.msg)
    });

    socket.on('remove-room',id=>{
      const index = myRooms.indexOf(id);
      console.log(index);
      if(index > -1){
        myRooms.splice(index,1);
      }
      console.log("new room people",myRooms);
    });


  });
  
  server.listen(8080, () => {
    console.log('listening on *:8080');
  });

//  db connection
mongoose
  .connect('mongodb://localhost/mern-stack', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected..."))
  .catch((err) => console.log(err));

  if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
  
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
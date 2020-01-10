const express=require('express');
const app=express();
const path = require('path');
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Nin=require('./models/ninjas');
const Ninja=Nin.Ninja;
const User=Nin.User;
mongoose.connect(
    process.env.MONGODB_URL,
  {
   useUnifiedTopology: true,
   useNewUrlParser: true
  }
);
mongoose.Promise = global.Promise;
app.use(express.static('client/build'));
app.post('/found',function(req,res){
  Ninja.create(req.body).then(function(ninja){
        res.send(ninja);
      });
});
app.get('/uses',(req,res)=>{
  User.find().exec()
  .then(docs=>{res.send(docs);});
});
app.get('/yes', (req, res) => {
res.send([{ "username": "Flavio" }]);
});
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });

http.listen(port, function(){
  console.log('listening on *:' + port);
});

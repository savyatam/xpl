const express=require('express');
const app=express();
const path = require('path');
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
const mongoose = require('mongoose');
/*app.use(express.static('public'));
app.get('/',function(req,res) {
  res.sendFile(__dirname+'/public/index.html');

});*/
const Nin=require('./models/ninjas');
const Ninja=Nin.Ninja;
const User=Nin.User;
const mongoURI =
  "mongodb+srv://shobha_99:ysav123456789@restappl-gtjru.mongodb.net/test?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoURI);
// Init gfs
app.use(express.static('client/build'));
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

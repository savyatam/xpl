const express=require('express');
const app=express();
const path = require('path');
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
/*app.use(express.static('public'));
app.get('/',function(req,res) {
  res.sendFile(__dirname+'/public/index.html');

});*/
app.use(express.static('client/build'));

  app.get('/yeah', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
http.listen(port, function(){
  console.log('listening on *:' + port);
});

const express=require('express');
const app=express();
const path = require('path');
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Nin=require('./models/ninjas');
const Comment=require('./models/comments');
const Ninja=Nin.Ninja;
const User=Nin.User;
const bodyParser = require('body-parser');
const cors = require("cors");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const multer = require("multer");
const Jwt=require('jsonwebtoken');
const check=require('./middleware/check');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
const axios=require('axios');
let gfs;
mongoose.connect(
  "mongodb://shobha_99:ysav123456789@restappl-shard-00-00-gtjru.mongodb.net:27017,restappl-shard-00-01-gtjru.mongodb.net:27017,restappl-shard-00-02-gtjru.mongodb.net:27017/test?ssl=true&replicaSet=RestAppl-shard-0&authSource=admin&retryWrites=true&w=majority"  ,
  {
   useUnifiedTopology: true,
   useNewUrlParser: true
  }
);
const Grid = require("gridfs-stream");
const mongoURI='mongodb://shobha_99:ysav123456789@restappl-shard-00-00-gtjru.mongodb.net:27017,restappl-shard-00-01-gtjru.mongodb.net:27017,restappl-shard-00-02-gtjru.mongodb.net:27017/test?ssl=true&replicaSet=RestAppl-shard-0&authSource=admin&retryWrites=true&w=majority';
const conn = mongoose.createConnection(mongoURI);
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("Connection Successful");
});
mongoose.Promise = global.Promise;
app.use(express.static('client/build'));
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });
app.post("/fixit",check,upload.single("customFile"),(req, res, err) => {
   //upload.single(req.file);
   //console.log(req.headers);
  res.send(req.body);
  console.log(req.body);
});
app.post('/found',urlencodedParser,function(req,res){
  console.log(req.body.user);
  Comment.findOne({id:req.body.user.id}).exec()
  .then(docs=>
    {if(docs)
      {
        docs.comments.push(req.body.user.comments);
        docs.save();
        res.send(docs);
      }
      else {
        const p={
          filename:req.body.user.filename,
          id:req.body.user.id,
          comments:[]
        }
        //console.log(p);
        p.comments.push(req.body.user.comments);
        //console.log(p);
        Comment.create(p);
        res.send(p);
      }
    });
  /*Comment.create(req.body.user).then(function(ninja){
        res.send(ninja);
      });*/
});
app.post('/found1',urlencodedParser,function(req,res){
  //console.log(req.body);
  Comment.findOne({id:req.body.user._id}).exec()
  .then(docs=>
    {
      if (docs) {
      console.log('ui');
      res.send(docs);
      }
      console.log('jk');
    });
});
app.get('/imm',check,(req, res) => {
  console.log(req.headers.auth);
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      //res.render('index', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.send(files);
    }
  });
});
app.get('/imm/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});
app.get('/uses',check,(req,res)=>{
  console.log(req.headers);
  User.find().exec()
  .then(docs=>{res.send(docs);});
});
app.get('/comfile',(req,res)=>{
  console.log(req.headers);
  Comment.find().exec()
  .then(docs=>{res.send(docs);});
});
app.post('/signup',urlencodedParser,(req,res)=>{
 console.log(req.body.user);
  User.findOne({email:req.body.user.email}).exec().
  then(docs => {
    console.log(docs);
    if(docs)
    { //console.log('exists');
    //res.status(200).json(docs);
    res.send('email exists');
  }
    else {
      /*bcrypt.hash(req.body.password,10,(err,hash)=>{
        const use=req.body;
        use.password=hash;*/
        console.log('vt');
        User.create(req.body.user).then(function(ninja){
              res.send(ninja);
            });
    }

  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});
app.post('/login',urlencodedParser,(req,res)=>{
  //res.sendFile(__dirname+'loginn.html');
  console.log(req.body);
  //res.render('login',{qs:req.query});
  User.findOne({email:req.body.user.email}).exec().
  then(doc=>{
    console.log(doc);
    if(!doc)
    res.send('wrong email');
    else if(req.body.user.password==doc.password)
   {//res.send('successful');
    const token=Jwt.sign({email:doc.email},'privkey',{expiresIn:'1hr'});
    //res.send('login succesful');
    app.set('authorization',token);//console.log(headers.authorization);
    //res.render('showall');
    //Token=token;
    var decoded=Jwt.verify(token,'privkey');
    const object={token:token};
    console.log(decoded);
    console.log(object);res.send(object);
   }
   else res.send('wrong password');
  }).
  catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

});

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });


http.listen(port, function(){
  console.log('listening on *:' + port);
});

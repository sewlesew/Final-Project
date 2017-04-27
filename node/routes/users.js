var express = require('express');
var router = express.Router();
var mongojs=require('mongojs')
var db=mongojs('mongodb://admin:admin@ds117311.mlab.com:17311/bikeride',['users']);
var dbmsg=mongojs('mongodb://admin:admin@ds117311.mlab.com:17311/bikeride',['chatmessages']);


//1.get all users 
router.get('/', function(req, res, next) {
  db.users.find((err, clubs)=>{
      if(err){
          res.send(err);
      }
      res.json(clubs);
  });
});

//1.get all messages
router.get('/chatmessages/:fromuserid/:touserid', function(req, res, next) {
 dbmsg.chatmessages.find({$or:[{fromuserid:req.params.fromuserid,touserid:req.params.touserid},{fromuserid:req.params.touserid,touserid:req.params.fromuserid}]},(err, msg)=>{
      if(err){
          res.send(err);
      }
      res.json(msg);
  });
});


router.post('/add', function(req, res, next){

  console.log("post service........"+req.body);
    var message = req.body;
    if(!message.fromuserid || !(message.touserid)){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
       dbmsg.chatmessages.save(message,(err, msg)=>{
                 if(err){
                res.send(err);
            }
            res.json(msg);
        });
    }
});


//2. get one user
router.get('/:id', function(req, res, next) {
  db.users.find({_id: mongojs.ObjectId(req.params.id)},(err, clubs)=>{
      if(err){
          res.send(err);
      }
      res.json(clubs);
  });
});


//3.add/save user information
router.post('/', function(req, res, next){
    var users = req.body;
 
    
    if(!users.name || !(users.email)){
        res.status(400);
        res.json({
            "error": "Bad Data : sent from server"
        });
    } 
    else {
        db.users.save(users, function(err, data){
            if(err){
                res.send(err);
            }
            res.json(data);
        });
    }
});


//4. update user

router.put('/:id', function(req, res, next){
    var user = req.body;
    var upduser = {};
    
    if(user.name){
        upduser.name = user.name;
    }
    
    if(user.email){
       upduser.email = user.email;
    }
    
    if(!upduser){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.users.update({_id: mongojs.ObjectId(req.params.id)},upduser, function(err, club){
        if(err){
            res.send(err);
        }
        res.json(club);
    });
    }
});


// 5. delete user
router.delete('/:id', function(req, res, next){

    // db.clubs.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, data){
    db.clubs.remove({email:req.params.id}, function(err, data){
        if(err){
            res.send(err);
        }
        res.json(data);
        console.log("from server side:deleted successfully")
    });
});



module.exports = router;


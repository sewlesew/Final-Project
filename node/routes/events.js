var express = require('express');
var router = express.Router();
var mongojs = require('mongojs')
var db = mongojs('mongodb://admin:admin@ds117311.mlab.com:17311/bikeride', ['events'])
var dbc=mongojs('mongodb://admin:admin@ds117311.mlab.com:17311/bikeride',['clubs'])
/* GET home page. */
/* GET users listing. */
/* GET home page. */

//get all events

router.post('/',  function (req, res, next) {
    var event = req.body;
    
    db.events.save( event , function (err, event) {
        if (err) {
            res.send(err);
        }
       console.log(event._id)
       //:{'$push' : 
     //  dbc.clubs.update({_id:mongojs.ObjectId(event.cid)},{"$set":{city :event.status}}, function(err, club){
       
        dbc.clubs.update({_id:mongojs.ObjectId(event.cid)},{"$push":{events :event._id}}, function(err, club){

           console.log("updated")
           res.json(club);
       })
        //res.json(event);
    });

    
});

router.get('/', function (req, res, next) {
    
    db.events.find({}, function (err, events) {
        if (err) {
            res.send(err);
        }
        res.json(events);
    });
});


router.get('/:uid',  function (req, res, next) {
    // var event = req.body;
    console.log()

db.clubs.find({members:req.params.uid},function(err,clubs){
 res.json(clubs);
});
});


//get all events by cid
router.get('/:cid/:uid',  function (req, res, next) {
    // var event = req.body;
    console.log()

db.events.find({ecid:req.params.cid},function(err,events){
    console.log("");
 res.json(events);
});
});

// new  route for status update
router.post('/status', function (req, res, next) {
                console.log('eid'+req.body.eid);
                 console.log('stat'+req.body.status);
               
    db.events.update( { _id: mongojs.ObjectId(req.body.eid) },{"$set": {estatus: req.body.status}},function (err, events) {
        if (err) {
            res.send(err);
        }
        res.json(events);
    });

});




//allows users to join the event
router.post('/join',  function (req, res, next) {
    var event = req.body;
    console.log("eid"+req.body.eid);
    console.log("uid"+req.body.uid);
    

dbc.events.update({_id:mongojs.ObjectId(req.body.eid)},{"$addToSet":{emembers:req.body.uid}}, function(err, event){

           console.log("uuuuuuuuuuuuuuuuuuupdated");
           res.json(event);
       });
});








router.get('/status/:status', function (req, res, next) {
    console.log("status/:status",req)
    db.events.find( {status:req.params.status }, function (err, events) {
        if (err) {
            res.send(err);
        }
        console.log(events)
        res.json(events);
    });
});




router.post('/:eid/:status', function (req, res, next) {
    console.log("status in")
db.events.update({ _id: mongojs.ObjectId(req.params.eid) }, {"$set": {status: req.params.status}}, function (err, club) {
            if (err) {
                res.send(err);
            }
            res.json(club);
        });

 });



module.exports = router;
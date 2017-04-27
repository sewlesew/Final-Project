var express = require('express');
var router = express.Router();
var mongojs = require('mongojs')
var db = mongojs('mongodb://admin:admin@ds117311.mlab.com:17311/bikeride', ['clubs'])
/* GET home page. */
/* GET users listing. */
/* GET home page. */

//get all clubs
router.get('/clubs', function (req, res, next) {
    //console.log(req.query.name, req.query.location)
    db.clubs.find((err, clubs) => {
        if (err) {
            res.send(err);
        }
        res.json(clubs);
    });
});


router.get('/clubs/:id', function (req, res, next) {
    db.clubs.find({ _id: mongojs.ObjectId(req.params.id) }, (err, clubs) => {
        if (err) {
            res.send(err);
        }
        res.json(clubs);
    });
});


router.get('/clubbyname/:name', function (req, res, next) {
    db.clubs.find({ name: req.params.name }, (err, clubs) => {
        if (err) {
            res.send(err);
        }
        res.json(clubs);
    });
});

router.get('/clubbycity/:city', function (req, res, next) {
    db.clubs.find({ city: req.params.city }, (err, clubs) => {
        if (err) {
            res.send(err);
        }
        res.json(clubs);
    });
});

/*
     {location:{
      "$near":{
          "$geometry":{ "type":'Point', 
              coordinate:[1, 2]
            }, 
            "$maxDistance":200
        }

 */

router.get('/isclubmember/:id/:member', function (req, res, next) {
    var member = req.params.member;
    db.clubs.find({ _id: mongojs.ObjectId(req.params.id), "members": member }, function (err, club) {
        if (err) {
            res.send(err);
        }
        res.json(club);
    });
});

router.get('/clubbylocation/:lo/:la', function (req, res, next) { //req.params.lo, req.params.la
    db.clubs.createIndex({ 'location': '2dsphere' })
    var p = ['Point'];// {"location.coordinate":{"$near":[1,2]}}
    db.clubs.find(

        {
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinate: [1, 2]
                    },
                    $maxDistance: 200
                }
            }
        }

        , (err, clubs) => {
            if (err) {
                res.send(err);
            }
            res.json(clubs);
        });
});


//Save Task
router.post('/clubs', function (req, res, next) {
    var club = req.body;
    if (!club.name || !(club.owner)) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.clubs.save(club, function (err, club) {
            if (err) {
                res.send(err);
            }
            res.json(club);
        });
    }
});

// Delete Task
router.delete('/clubs/:id', function (req, res, next) {
    db.clubs.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, club) {
        if (err) {
            res.send(err);
        }
        res.json(club);
    });
});

// Update Task
router.put('/clubs/:id', function (req, res, next) {
    var club = req.body;
    var updclub = {};

    if (club.name) {
        updclub.name = club.name;
    }

    if (task.owner) {
        updclub.owner = club.owner;
    }

    if (!updclub) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.clubs.update({ _id: mongojs.ObjectId(req.params.id) }, updowner, {}, function (err, club) {
            if (err) {
                res.send(err);
            }
            res.json(club);
        });
    }
});

router.post('/subscribeClub/:id/:member', function (req, res, next) {
    var member = req.params.member;
    db.clubs.update({ _id: mongojs.ObjectId(req.params.id) }, { '$push': { members: member } }, function (err, club) {
        if (err) {
            res.send(err);
        }
        res.json(club);
    });
});

router.post('/unSubscribeClub/:id/:member', function (req, res, next) {
    var member = req.params.member;
    db.clubs.update({ _id: mongojs.ObjectId(req.params.id) }, { '$pull': { members: member } }, function (err, club) {
        if (err) {
            res.send(err);
        }
        res.json(club);
    });
});


router.post('/event/:id', function (req, res, next) {
    var event = req.body;
    db.clubs.update({ _id: mongojs.ObjectId(req.params.id) }, { '$push': { events: event } }, function (err, club) {
        if (err) {
            res.send(err);
        }
        res.json(club);
    });
});

module.exports = router;


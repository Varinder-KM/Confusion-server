const router = require('express');
const bodyParser = require('body-parser');
const Leader = require('../modules/leaders');

const leaderRouter = router.Router();
leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
.get((req, res, next) =>{
    Leader.find({})
    .then((leaders) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leaders);

    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) =>{
    Leader.create(req.body)
   .then((leader) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(leader);

   },(err) => next(err))
   .catch((err) => next(err));
})
.put((req, res, next) =>{
    res.statusCode = 400;
    res.end('put method is not applicable');
})
.delete((req, res, next) =>{
    Leader.remove({})
    .then((response) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
    
    },(err) => next(err))
    .catch((err) => next(err));
});


leaderRouter.route('/:leaderId')
.get((req, res, next) =>{
    Leader.findById(req.params.leaderId)
    .then((leader) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
    })
    .catch((err) => next(err));
})
.post((req, res, next) =>{
    res.statusCode=403;
    res.end('Post method is not applicable');
})
.put((req, res, next) =>{
    Leader.findByIdAndUpdate(req.params.promoId,{$set: req.body}, {new: true})
   .then((leader) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(leader);
    })
    .catch((err) => next(err));
})
.delete((req, res, next) =>{
    Leader.findByIdAndRemove(req.params.leaderId)
    .then((respon) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(respon);
    })
    .catch((err) => next(err));
});

module.exports = leaderRouter;
const router = require('express');
const bodyParser = require('body-parser');
const Dishes = require('../modules/dishes');

const disherouter = router.Router();
disherouter.use(bodyParser.json());

disherouter.route('/')
.get((req, res, next) =>{
   Dishes.find({})
   .then((dishes) =>{
       res.statusCode = 200;
       res.setHeader("Content-Type", "application/json");
       res.json(dishes);
   },(err) => next(err))
   .catch((err) => next(err));
})
.post((req, res, next) =>{
    Dishes.create(req.body)
    .then((dish) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish);
    },(err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) =>{
    res.statusCode = 400;
    res.end('Put Method is not Applicable');
})
.delete((req, res, next) =>{
  Dishes.remove({})
  .then((response) =>{
      console.log(response);
  })
  .catch((err) => console.log(err));

});


disherouter.route('/:dishId')
.get((req, res, next) =>{
   Dishes.findById(req.params.dishId)
        .then((dish) =>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dish);
        },(err) => next(err))
        .catch((err) => next(err));
})
.post((req, res, next) =>{
    res.statusCode = 400;
    res.end('Pot method is not Applicable');
})
.put((req, res, next) =>{
   Dishes.findByIdAndUpdate(req.params.dishId, {$set : req.body},{new : true})
   .then((dish) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish);
   })
   .catch((err) => next(err));
})
.delete((req, res, next) =>{
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = disherouter;

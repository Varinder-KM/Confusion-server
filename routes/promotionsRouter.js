const router = require('express');
const bodyParser = require('body-parser');
const Promotion = require('../modules/promotions');

const promotionsRouter = router.Router();
promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
.get((req, res, next) =>{
    Promotion.find({})
    .then((promotions) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotions);

    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) =>{
   Promotion.create(req.body)
   .then((promotion) =>{
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(promotion);

   },(err) => next(err))
   .catch((err) => next(err));
})
.put((req, res, next) =>{
    res.statusCode = 400;
    res.end('put method is not applicable');
})
.delete((req, res, next) =>{
    Promotion.remove({})
    .then((response) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
    
    },(err) => next(err))
    .catch((err) => next(err));
});


promotionsRouter.route('/:promoId')
.get((req, res, next) =>{
    Promotion.findById(req.params.promoId)
    .then((promotion) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
    })
    .catch((err) => next(err));
})
.post((req, res, next) =>{
    res.statusCode=403;
    res.end('Post method is not applicable');
})
.put((req, res, next) =>{
   Promotion.findByIdAndUpdate(req.params.promoId,{$set: req.body}, {new: true})
   .then((promotion) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(promotion);
    })
    .catch((err) => next(err));
})
.delete((req, res, next) =>{
    Promotion.findByIdAndRemove(req.params.promoId)
    .then((respon) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(respon);
    })
    .catch((err) => next(err));
});


module.exports = promotionsRouter;
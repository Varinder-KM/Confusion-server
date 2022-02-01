const router = require('express');
const bodyParser = require('body-parser');

const promotionsRouter = router.Router();
promotionsRouter.use(bodyParser.json());

promotionsRouter.route('/')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req, res, next) =>{
    res.end('this is a get Request Method for Promotions');
})
.post((req, res, next) =>{
    res.write('will add the dish : '+ req.body.name + ' '+ req.body.description);
    res.end('this is a post Request Method for Promotions');
})
.put((req, res, next) =>{
    res.statusCode = 400;
    res.end('Put Method is not supported in Promotions');
})
.delete((req, res, next) =>{
    res.end('this method is used to delete all Promotions');
});


promotionsRouter.route('/:promoId')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next();
})
.get((req, res, next) =>{
    res.end('this is a get Request Method for dishId : '+ req.params.promoId);
})
.post((req, res, next) =>{
    res.statusCode=403;
    res.end('Pot Method is not supportes Request Method');
})
.put((req, res, next) =>{
    res.end('this is a PUT Request Method for dishId : '+ req.params.promoId);
})
.delete((req, res, next) =>{
    res.end('this method is used to delete dish whose id is ' + req.params.promoId +' description');
});


module.exports = promotionsRouter;
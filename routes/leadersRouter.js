const router = require('express');
const bodyParser = require('body-parser');

const leaderRouter = router.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next();
})
.get((req, res, next) =>{
    res.end('this is a get Request Method for leaders');
})
.post((req, res, next) =>{
    res.write('will add the dish : '+ req.body.name + ' '+ req.body.description);
    res.end('this is a post Request Method for leaders');
})
.put((req, res, next) =>{
    res.statusCode = 400;
    res.end('Put Method is not supported in leaders');
})
.delete((req, res, next) =>{
    res.end('this method is used to delete all leaders');
});


leaderRouter.route('/:leaderId')
.all((req, res, next) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain')
    next();
})
.get((req, res, next) =>{
    res.end('this is a get Request Method for dishId : '+ req.params.leaderId);
})
.post((req, res, next) =>{
    res.statusCode=403;
    res.end('Pot Method is not supportes Request Method');
})
.put((req, res, next) =>{
    res.end('this is a PUT Request Method for dishId : '+ req.params.leaderId);
})
.delete((req, res, next) =>{
    res.end('this method is used to delete dish whose id is ' + req.params.leaderId +' description');
});

module.exports = leaderRouter;

const router = require('express');
const bodyParser = require('body-parser');
const Dishes = require('../modules/dishes');
var auth = require('../Authantication');
var cors = require('./cors');

const disherouter = router.Router();
disherouter.use(bodyParser.json());

disherouter.route('/')
.options(cors.corewithOption, (req, res, next) =>{
    res.statusCode(200);
})
.get(cors.cors, (req, res, next) =>{
   Dishes.find({})
   .populate('comments.author')
   .then((dishes) =>{
       res.statusCode = 200;
       res.setHeader("Content-Type", "application/json");
       res.json(dishes);
   },(err) => next(err))
   .catch((err) => next(err));
})
.post(cors.corsWithOption, auth.verifyUser,auth.verifyAdmin, (req, res, next) =>{
    Dishes.create(req.body)
    .then((dish) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish);
    },(err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOption, auth.verifyUser, (req, res, next) =>{
    res.statusCode = 400;
    res.end('Put Method is not Applicable');
})
.delete(cors.corsWithOption, auth.verifyUser,auth.verifyAdmin, (req, res, next) =>{
  Dishes.remove({})
  .then((response) =>{
      console.log(response);
  })
  .catch((err) => console.log(err));

});


disherouter.route('/:dishId')
.option(cors.cors, (req, res, next) =>{ res.statusCode(200)})
.get(cors.cors,(req, res, next) =>{
   Dishes.findById(req.params.dishId)
        .populate('comments.author')
        .then((dish) =>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dish);
        },(err) => next(err))
        .catch((err) => next(err));
})
.post(cors.corsWithOption, auth.verifyUser, (req, res, next) =>{
    res.statusCode = 400;
    res.end('Pot method is not Applicable');
})
.put(cors.corsWithOption, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
   Dishes.findByIdAndUpdate(req.params.dishId, {$set : req.body},{new : true})
   .then((dish) =>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish);
   })
   .catch((err) => next(err));
})
.delete(cors.corsWithOption, auth.verifyUser, auth.verifyAdmin, (req, res, next) =>{
    Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

// Comment Section
disherouter.route('/:dishId/comments')
.option(cors.cors, (req, res, next) =>{ res.statusCode(200)})
.get(cors.cors,(req, res, next) =>{
   Dishes.findById(req.params.dishId)
   .populate('comments.author')
   .then((dish) =>{
       if(dish != null){
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(dish.comments);
       }else{
           var err = new Error("Dish " + req.params.dishId + " not Exists");
           err.statusCode = 404;
           return next(err);
       }   
   },(err) => next(err))
   .catch((err) => next(err));
})
.post(cors.corsWithOption, auth.verifyUser, auth.verifylocal, (req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
       
        if(dish != null){
         req.body.author=req.user._id
         dish.comments.push(req.body)
         dish.save()
         .then((dish) =>{
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dish.comments);
         },(err) => next(err));

        }else{
            var err = new Error("Dish " + req.params.dishId + " not Exists");
            err.statusCode = 404;
            return next(err);
        }   
    },(err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOption, auth.verifyUser, auth.verifylocal, (req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(dish != null){
            res.statusCode = 404 ;
            res.end('Put Method is not Applicable')
        }else{
            var err = new Error("Dish " + req.params.dishId + " not Exists");
            err.statusCode = 404;
            return next(err);
        }  
    },(err) => next(err))
    .catch((err) => next(err)); 
})
.delete(cors.corsWithOption, auth.verifyUser, auth.verifylocal, (req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{
        if(dish != null){
            for(var i = (dish.comments.length - 1); i>=0 ; --i){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then((dish) =>{
                res.statusCode = 200;
                res.setHeader("Content-Type","application/json");
                res.json(dish);
            }, (err) => next(err))
        }else{
            var err = new Error("Dish " + req.params.dishId + " not Exists");
            err.statusCode = 404;
            return next(err);
        }  
    })
    .catch((err) => console.log(err));

});


disherouter.route('/:dishId/comments/:commentId')
.option(cors.cors, (req, res, next) =>{ res.statusCode(200)})
.get(cors.cors, (req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then((dish) =>{
        if(dish != null & dish.comments.id(req.params.commentId)!=null){
         res.statusCode = 200;
         res.setHeader("Content-Type", "application/json");
         res.json(dish.comments.id(req.params.commentId));
        }else{
            var err = new Error("Dish " + req.params.dishId + " not Exists");
            err.statusCode = 404;
            return next(err);
        }   
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOption, auth.verifyUser, (req, res, next) =>{
    res.statusCode = 400;
    res.end('Pot method is not Applicable');
})
.put(cors.corsWithOption, auth.verifyUser, auth.verifylocal, (req, res, next) =>{
    Dishes.findById(req.params.dishId)
   .then((dish) =>{
       if(dish!=null && dish.comments.id(req.params.commentId)!=null){     
           if(req.body.rating){
               dish.comments.id(req.params.commentId).rating = req.body.rating;
           }
           if(req.body.comment){
               dish.comments.id(req.params.commentId).comment = req.body.comment;
           }

           dish.save()
           .then((dish) =>{
                dish.comments.author=dish._id;
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(dish.comments);
            }
           ,(err) =>next(err));
       }
       else if(dish == null) {
        var err = new Error("Dish " + req.params.dishId + " not Exists");
        err.statusCode = 404;
        return next(err);
       }
       else{
        var err = new Error("Comment " + req.params.commentId + " not Exists");
        err.statusCode = 404;
        return next(err);
       }
   })
   .catch((err) => next(err));
})
.delete(cors.corsWithOption, auth.verifyUser, auth.verifylocal, (req, res, next) =>{
    Dishes.findById(req.params.dishId)
    .then((dish) =>{

        if(dish!=null & dish.comments.id(req.params.commentId)!=null){  
          var comment =  dish.comments.filter((comment) => comment._id == req.params.commentId
           && comment.author == req.user._id);
          
            if(comment){
                dish.comments.id(req.params.commentId).remove();
                dish.save()
                .then((dish) =>{
                    Dishes.findById(dish._id)
                    .populate('comments.author')
                    .then((dish) =>{
                    res.statusCode = 200;
                    res.setHeader("Content-Type","application/json");
                    res.json(dish);
                    })
                },(err) => next(err));

            } else{
                var err = new Error("You are not Authanticate to Perform this operation");
                err.statusCode = 404;
                return next(err);
               }
        }else{
         var err = new Error("Dish " + req.params.dishId + " not Exists");
         err.statusCode = 404;
         return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = disherouter;

var express = require('express');
var router = express.Router();
var User  = require('../modules/users');
const bodyParser = require('body-parser');
var passport = require('passport');
var authauthanticat = require('../Authantication');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',(req, res, next) =>{
  User.register(new User({username: req.body.username}),
  req.body.password,(err, user) =>{
    if(err){
      res.statusCode= 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});

    }else{
      if(req.body.firstname){
        user.firstname=req.body.firstname;
      }
      if(req.body.lastname){
        user.lastname=req.body.lastname;
      }
      user.save((err,user) =>{
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () =>{
          res.statusCode= 200;
          res.setHeader('Content-Type','application/json');
          res.json({Success: true, Status: ' Registration Successfully"!'});
        });
      });
    }
  })
});

router.post('/login',passport.authenticate('local'),(req, res)=>{
 
  var token = authauthanticat.getToken({_id: req.user._id});
  res.setHeader('Content-Type', 'application/json');
  res.statusCode= 200;
  res.json({Success: true,Token :  token, Status: ' Registration Successfully"!'});
});

router.get('/logout', (req, res, next) =>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }else{
    var err = new Error('you Are not logein');
    err.status = 403;
    next(err);
  }
})
module.exports = router;

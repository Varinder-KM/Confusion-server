var parsport = require('passport');
var User = require('./modules/users');
var config = require('./config.js');

var LocalStrategy =  require('passport-local').Strategy;

var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
const passport = require('passport');

exports.local = parsport.use(new LocalStrategy(User.authenticate()));
parsport.serializeUser(User.serializeUser());
parsport.deserializeUser(User.deserializeUser());

exports.getToken = (user) =>{
    return jwt.sign(user, config.secretkey, {expiresIn : 3600});
};

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretkey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, 
    (jwt_payload,done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) =>{
            if(err){
                return done(err, false);
            }
            else if(user){
                return done(null, user);
            }
            else{
                return done(null , false);
            }
        });
    }
));

exports.verifyUser = passport.authenticate('jwt', {session: false});

exports.verifyAdmin = (req, res ,next) =>{
    console.log("this is called");
    if(req.user !=null && req.user.admin == true){
        console.log("this is also called" + req.user.admin);
        next();
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","plain/text");
        res.end("You are Not Authanticate to Perform This task");
    }
}

exports.verifylocal = (req, res ,next) =>{
    console.log("this is called");
    if(req.user !=null && req.user.admin == false){
        console.log("this is also called" + req.user.admin);
        next();
    }
    else{
        res.statusCode = 500;
        res.setHeader("Content-Type","plain/text");
        res.end("You are Not Authanticate to Perform This task");
    }
}
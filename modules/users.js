var mongoose = require('mongoose');
var schema = mongoose.Schema;
var passportLocalMoongose = require('passport-local-mongoose');

const userShema = new schema({
    firstname:{
        type:String,
        default:''
    },
    lastname:{
        type:String,
        default:''
    },
    admin:{
        type: Boolean,
        default: false
    }
});

userShema.plugin(passportLocalMoongose);

const User = mongoose.model('User', userShema);
module.exports = User;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentShema = new Schema({
    rating: {
        type : Number,
        min:1,
        max:5,
        require : true
    },
    comment: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{
    timestamps : true
});

const disheSchema = new Schema({
    name:{
        type : String,
        require : true,
        unique : true
    },
    description :{
        type : String,
        require : true
    },
    image:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    label:{
        type: String,
        default: ""
    },
    price:{
        type: String,
        require: true
    },
    featured:{
        type: Boolean,
        default: false
    },
    comments : [commentShema]
},
{
    timestamps : true
});

var Dishes = mongoose.model("dish", disheSchema);

module.exports = Dishes;
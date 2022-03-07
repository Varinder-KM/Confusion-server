const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionSchema = new Schema({
    name:{
        type : String,
        require: true,
        unique: true
    },
    image:{
        type: String,
        require: true
    },
    label: {
        type: String,
        default: ""
    },
    price:{
        type: Number,
        require: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    description:{
        type: String,
        require: true
    }

},{
    timestamps: true
});

const Promotions = mongoose.model("promotion", promotionSchema);
module.exports = Promotions;
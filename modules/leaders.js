const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name:{
        type : String,
        require: true,
        unique: true
    },
    image:{
        type: String,
        require: true
    },
    designation: {
        type: String,
        require: true
    },
    abbr:{
        type: String,
        require: true
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

const Leaders = mongoose.model("leader", leaderSchema);
module.exports = Leaders;
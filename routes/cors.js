const express = require('express');
const cors = require('cors');
const app = express();

const whitespace = ['http://localhost:3000', 'https://localhost:3443'];
const corsOptionDelegate = (req, callback) =>{
    var coreOption;
    if(whitespace.indexOf(req.header('Origin'))){
        coreOption = {origin : true};
    }
    else{
        coreOption = {origin: false};
    }
    return coreOption;
}

module.cors = cors();
module.corsWithOption = cors(corsOptionDelegate);

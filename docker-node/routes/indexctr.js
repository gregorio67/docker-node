const express = require('express');

const router = express.Router();
const models = require('../models');


router.get('/', (request, response) => {
    var message = "Welcome to node sample in docker and successfully launched";
    if (request.session.views) {
        request.session.views++;
    }
    else {
        request.session.views = 1;
    }
    response.status(200).send(message);
});


router.get('/json', (request, response) => {
    var userInfo ={name:"kkimdoy", age:20, phone:"010-2222-33333"};
    var msg = {code:"info.success", status: "S"};
    var json = JSON.stringify({
            result: userInfo,
            message: msg
        });
    
    console.log("result : %s", json);
    response.status(200).send(json);
});

module.exports = router;
const express = require('express');

const router = express.Router();
const models = require('../models');


router.get('/', (request, response) => {
    response.render("login");
});


router.get('/home', (request, response) => {
    var username = request.session.username;
    console.log("username at home :: %s", username);
    if (username) {
        response.render("welcome", {"user": username});
    }
    else {
        response.render("login");
    }

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

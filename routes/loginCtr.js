const express = require('express');
const User = require('../models').User;

const router = express.Router();

router.post('/login.do', (request, response) => {
    console.log("username :: %s", request.body.username);
    var username = request.body.username;
    var password = request.body.password;
    User.findOne({
        attributes: ['username', 'password'],
        where: {
            username: username,
            password: password
        },
        raw: true,
        nest: true
    })
    .then((user) => {
        console.log("%s is logined", username);
        request.session.logined = true;
        request.session.username = username;
        result = {"user": username};
        response.render("welcome", {"user": username});
    })
    .catch((err) => {
        console.log(err);
        response.render("login");
    })
});


router.get('/logout.do', (request, response) => {
    console.log("Session Key :: %s", request.session.key);
    request.session.destroy(function(err) {
        if (err) {
            console.log(err);
        }
        else {
            response.redirect("/");
        }
    });
});

module.exports = router;

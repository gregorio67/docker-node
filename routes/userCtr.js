const express = require('express');
const User = require('../models').User;
//const users = require('../repository/users');

const router = express.Router();


router.get("/list.do", (request, response) => {
    

    User.findAll({
        attributes: ['username', 'password'],
        raw: true,
        nest: true
    }).then((users) => {
        console.log(users);

        var msg = {code:"info.success", status: "S"};
        var json = JSON.stringify({
            result: users,
            message: msg
        })
    
        response.status(200).send(json);
    })
    .catch(function(err) {
        console.log(err);
        var msg = {code:"err.service", status: "E"};    
        response.status(200).send(JSON.stringify(msg));

    });

});

module.exports = router;

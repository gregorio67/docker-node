const express = require('express');
const session = require('express-session');
const uuid = require('uuid/v4');
const redis = require('redis');
const bodyParser = require('body-parser');
// const ookieParser = require('cookie-parser');

/** Routes **/
const indexCtr = require('./routes/indexCtr');
const userCtr = require('./routes/userCtr');
const loginCtr = require('./routes/loginCtr');


const sessionStore = session.MemoryStore();


const app = express();
/**  Session must be set in app  at first */
/** Memeoy Session
app.use(session({
    genid: function(req) {
        return uuid() // use UUIDs for session IDs
    },
    key : 'app.sid',
    secret: "ThisIsHowYouUseRedisSessionStorage",
    // resave: false,
    store: sessionStore,
    // saveUninitialized: true
}));
**/

/** Redis session **/ 
const redisClient = redis.createClient();
const RedisStore = require('connect-redis')(session);
redisClient.on('error', (err) => {
    console.log("Redis connect failed : ", err);
});

app.use(session({
    genid:(req) => {
        console.log("Inside the session middleware");
        console.log(req.sessionID);
        return uuid();
    },
    store: new RedisStore({ 
        host: 'localhost', 
        port: 6379,
        client: redisClient, 
        ttl: 86400 }),
    secret: 'ThisIsHowYouUseRedisSessionStorage',
    name: '_redisPractice',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        sameSite: true,
        maxAge: 60000,
        secure: true }
  }));

/**For json request **/
app.use(express.json());

/** Set body parser */
app.use(bodyParser.urlencoded({ extended: true }));


/** Set view with EJS **/
app.set('view engine', 'ejs');
/** Set resources */
app.use(express.static('resources'));

/** Set resources */
app.use(express.static('resources'));
app.use('/', indexCtr);
app.use('/user', userCtr);
app.use('/', loginCtr);



const sequelize = require('./models').sequelize;
sequelize.sync();


module.exports = app;

const express = require('express');
const session = require('express-session');
const uuid = require('uuid/v4');
const redis = require('redis');
const indexCtr = require('./routes/indexctr');
const userCtr = require('./routes/userctr')
const bodyParser = require('body-parser');

const redisClient = redis.createClient();
const redisStore = require('connect-redis')(session);

redisClient.on('error', (err) => {
    console.log("Redis connect failed : ", err);
});

const app = express();
/**For json request **/
app.use(express.json());

/** Set body parser */
app.use(bodyParser.urlencoded({ extended: true }));

/** Set view with EJS **/
app.set('view engine', 'ejs');

/** Set resources */
app.use(express.static('resources'));

app.use('/', indexCtr);
app.use('/user', userCtr);

/** Redis session */
app.use(session({
    genid:(req) => {
        console.log("Inside the session middleware");
        console.log(req.sessionID);
        return uuid();
    },
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
    secret: 'ThisIsHowYouUseRedisSessionStorage',
    name: '_redisPractice',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        sameSite: true,
        maxAge: 60000,
        secure: false }, // Note that the cookie-parser module is no longer needed
  }));

const sequelize = require('./models').sequelize;
sequelize.sync();


module.exports = app;
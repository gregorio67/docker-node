/** app.js */
const app = require('./app');

/** Input Parameter 
var args = process.argv.slice(2);
var size = args.length;
if (size < 1) {
    console.log("Please enter port number to listen");
    process.exit();
}
**/

/** Listen port for heroku **/
var listenPort = 13000;

/** Start express server **/
const server = app.listen(listenPort, ()=> {
    console.log(`Express is running on port ${server.address().port}`);
})

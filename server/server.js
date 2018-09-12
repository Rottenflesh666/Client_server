const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dbConnect = require('./config/db');
const config = require('./config/config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});*/

//db init here

dbConnect.dbConnect();
app.use(express.static(path.join(__dirname, '/../client/build')));
require('./routes/index')(app);
app.listen(config.server.port, () => console.log('listening on port ' + config.server.port));

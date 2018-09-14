const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const axios = require('axios');
const chalk = require('chalk');
const path = require('path');
const os = require('os');
const pg = require('pg');
const app = express();
const Pool = pg.Pool;

// fire middleware
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://' + os.hostname + ':' + port);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    next();
});

// postgres databse connection
// init db to connect to
const dbConnection = process.env.DATABASE_URL || 'postgresql://admin:iamgroot@localhost:5432/grg_dashboard';

// connect to db
const pool = new Pool({
    connectionString: dbConnection
});

// pool.query(`SELECT * FROM users`, (err, res) => (err) ? console.log('error loading data: ', err) : console.log(res.rows));

// serve the index.html file for the vue frontend
app.get('/', (req, res) => { res.sendfile('./public/index.html') });
app.get('/api/users', async (req, res) => {
    pool.query(`SELECT * FROM users`)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log('error encountered: ', err)
        })
});
// handle login credentials
app.post('/login', async (req, res) => {
    let data = req.body;
    console.log(data);
    let theData = [];
    theData.push(data.email);
    theData.push(data.password);

    console.log(theData)

    await pool.query(`SELECT * FROM users WHERE email_address = $1 AND password = $2`, theData, async (err, data) => {

        (data.rows < 1 || err) ? await console.log('name not exit', err): await console.log('user found', data.rows[0]);
        console.log('found user', data.rows[0]);
        await res.json(data.rows[0]);
    });
});

// port init
const port = process.env.PORT || 2000;
app.listen(port, (err) => (err) ? console.log(err) : console.log(chalk.green('app running on port :' + os.hostname + ":" + port)));

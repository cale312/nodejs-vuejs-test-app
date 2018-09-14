const express = require('express');
const logger = require('morgan');
const chalk = require('chalk');
const app = express();
const pg = require('pg');
const Pool = pg.Pool;
const axios = require('axios');
const os = require('os');

var bodyParser = require('body-parser')

const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: true}));


// postgres databse connection
// init db to connect to
const dbConnection = process.env.DATABASE_URL || 'postgresql://admin:iamgroot@localhost:5432/grg_dashboard';

//axios.get('https://jsonplaceholder.typicode.com/todos/1').then( (data) => console.log('response', data)).catch(err => console.log(err));

// connect to db
const pool = new Pool({ connectionString: dbConnection });

// insert new user
// pool.query(`INSERT INTO users(email_address, password) VALUES('jdoe@example.com', 201000)`, (err, res) => (err) ? console.log(chalk.red(err)) : console.log(chalk.green('data added')));

pool.query(`SELECT * FROM users`, (err, res) => (err) ? console.log('error loading data: ', err) : console.log(res.rows));

app.get('/', (req, res) => { res.sendfile('./public/index.html') });

app.post('/login', async (req, res) => {
    var results = '';
    let data = req.body;
    console.log(data);
    let theData = [];
    theData.push(data.email);
    theData.push(data.password);

    console.log(theData)

    await pool.query(`SELECT * FROM users WHERE email_address = $1 AND password = $2`, theData, async (err, res) => {

        (res.rows < 1 || err) ? await console.log('name not exit', err) : await  console.log('user found', res.rows[0]);
	results = res;

    });
    await res.send(results);
})

// morgan logger middleware
app.use(logger('dev'));

const port = process.env.PORT || 2000;
app.listen(port, (err) => (err) ? console.log(err) : console.log(chalk.green('app running on port :' + os.hostname + ":" + port)));
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://' + os.hostname + ':' + port);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    next();
});

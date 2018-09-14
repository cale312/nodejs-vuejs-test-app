const express = require('express');
const logger = require('morgan');
const chalk = require('chalk');
const app = express();
const pg = require('pg');
const Pool = pg.Pool;
const axios = require('axios');

const path = require('path');

app.use(express.static(path.join(__dirname, '/public')));


// postgres databse connection
// init db to connect to
const dbConnection = process.env.DATABASE_URL || 'postgresql://admin:iamgroot@localhost:5432/grg_dashboard';

//axios.get('https://jsonplaceholder.typicode.com/todos/1').then( (data) => console.log('response', data)).catch(err => console.log(err));

// connect to db
const pool = new Pool({ connectionString: dbConnection });

// insert new user
//pool.query(`INSERT INTO users(id, user_name, password) VALUES(20181, 'ludo', 201000)`, (err, res) => (err) ? console.log(chalk.red(err)) : console.log(chalk.green(res)));

const users = pool.query(`SELECT * FROM users`, (err, res) => (err) ? console.log('error loading data') : console.log(res.rows));

app.get('/', (req, res) => { res.sendfile('./public/index.html') });

// morgan logger middleware
app.use(logger('dev'));


const port = process.env.PORT || 2000;
app.listen(port, (err) => (err) ? console.log(err) : console.log(chalk.green('app running on port' + port)));

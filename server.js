const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: 5432,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res)=>{
  res.json('success')
})

app.listen(3000, ()=>{
  console.log("app is running on port 3000")
})

app.post('/signin', cors(), (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res,db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })

app.put('/image', (req, res) => { image.handleImage(req, res, db) })

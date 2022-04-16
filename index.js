const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true, parameterLimit:100000000000 }));

app.use(cors({
    origin: '*'
}));

app.use(express.json());

const routes = require('./routes/routes'); //importing routes to index file
app.use('/api', routes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

//connect the database to our server using mongoose.
require('dotenv').config();
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection

//we have to throw a success or an error message depending on whether our database connection is successful or fails.
database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
})

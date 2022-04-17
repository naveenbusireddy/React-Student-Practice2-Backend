require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const cors = require('cors');

//importing the Routes to index file
const routes = require('./routes'); 

//connect the database to our server using mongoose.
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection

//Middleware
app.use(express.json());

app.use(cors({
    origin: '*'
}));

//Routes
app.use('/api', routes);


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true, parameterLimit:100000000000 }));

//Server connection at port:3000
app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

//we have to throw a success or an error message depending on whether our database connection is successful or fails.
database.on('error', (error) => {
    console.log(error);
})
database.once('connected', () => {
    console.log('Database Connected');
})

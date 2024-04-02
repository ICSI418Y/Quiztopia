const express = require('express');
const cors = require('cors');
const app = express();

const User = require('./UserSchema.js');
const CardSet = require('./CardSetSchema.js');
const FlashCard = require('./FlashcardSchema.js');
const Class = require('./ClassSchema.js');


app.use(express.json());
app.use(cors());
app.listen(9000, () => {
    console.log('Server Started at ${9000}')
})

const mongoose = require('mongoose');

const mongoString = "";         // TODO: Make database.
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => console.log(error))

database.once('connected', () => console.log('Database Connected'))
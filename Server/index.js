const express = require('express');
const cors = require('cors');
const app = express();

const User = require('./UserSchema.js');
const Folder = require('./FolderSchema.js');
const Set = require('./SetSchema.js');
const Flashcard = require('./FlashcardSchema.js');
const Class = require('./ClassSchema.js');


app.use(express.json());
app.use(cors());
app.listen(9000, () => {
    console.log('Server Started at ${9000}')
})

const mongoose = require('mongoose');

const mongoString = "mongodb+srv://quiztopia:6YaTcokwzpoSo3nW@databace.kfmvvmh.mongodb.net/";
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => console.log(error))
database.once('connected', () => console.log('Database Connected'))

/**
 * /createUser
 * 
 * Creates a new user using the provided information. Returns error if a user with the same username already exists.
 * 
 * @param firstName The first name of the new user.
 * @param lastName The last name of the new user.
 * @param username The username of the new user.
 * @param password The password for the new user.
 */
app.post('/createUser', async (req, res) => {
    try{
        // Get info
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const username = req.body.username;
        const password = req.body.password;
        console.log("/createUser " + firstName + " " + lastName + " " + username + " " + password);

        // Check that there isn't another user with the same username
        const testUsername = await User.findOne({username : username});

        if (testUsername == null){
            // Make their root folder.
            const title = username + "RootFolder";
            const parent = null;
            const children = [];
            const sets = []
            const newFolder = new Folder({title, parent, children, sets});
            
            const rootFolder = await newFolder.save();

            // Make empty classes array
            const classes = [];

            // Make the new user, and return result.
            const user = new User({firstName, lastName, username, password, folder : rootFolder._id, classes});
            await user.save()
            res.send(user);
            console.log("New User: FN:" + firstName + " LN:" + lastName + " ID:" + username + " PW:" + password);
        }
        else {
            res.status(500).send("Username already exists")
            console.log("ERROR: Username: \"" + username + "\" already exists.");
        }
        
    }
    catch(error){
        res.status(500).send(error);
        console.log(error);
    }
})

// - `/getUsers` - `(req:{ids : [User._id]}, res{users : [User]})` - UNIMPLEMENTED

// - `/getUser` - `(req:{_id}, res{User})` - UNIMPLEMENTED

// - `/getUserByUserName` - `(req:{userName}, res{User})` - UNIMPLEMENTED

// - `/deleteUser` - `(req:{_id}, res{})` - UNIMPLEMENTED 


// - `/createFolder` - `(req : {title : String, parent : Folder._id}, res{})` - UNIMPLEMENTED

// - `/getFolderByID` - `(req : {_id}, res : {title : String, parent : SmallFolder, children : [SmallFolder], sets : [SmallSet]})` - UNIMPLEMENTED

// - `/getCopy` - `(req : {_id}, res {Folder._id})` - UNIMPLEMENTED

// - `/editChildren` - `(req : {_id, children [Folder._id]}, res {})` - UNIMPLEMENTED

// - `/editSets` - `(req : {_id, sets [Set._id]}, res {})` - UNIMPLEMENTED

// - `/deleteFolder` - `(req:{_id}, res{})` - UNIMPLEMENTED


// - `/createClass` - `(req : {owner : User._id, teachers : [User._id], students : [User._id]}, res {})` - UNIMPLEMENTED

// - `/getClass` - `(req : {}, res {})` - UNIMPLEMENTED

// - `/editStudents` - `(req : {students : [User._id]}, res {})` - UNIMPLEMENTED

// - `/editTeachers` - `(req : {teachers : [User._id]}, res {})` - UNIMPLEMENTED


// - `/getRoster` - `(req:{users : [User]}, res{})` - UNIMPLEMENTED

// - `/editRoster` - `(req:{_id, users : Ow[User]}, res{_id})` - UNIMPLEMENTED


// - `/createSet` - `(req:{title : String, description : String, flashcards : [Flashcard]}, res{})` - UNIMPLEMENTED

// - `/editTitle` - `(req:{title : String}, res{})` - UNIMPLEMENTED

// - `/editDescription` - `(req:{description : String}, res{})` - UNIMPLEMENTED

// - `/editCards` - `(req:{oldCard : Flashcard._id, newCard : Flashcard}, res{})` - UNIMPLEMENTED

// - `/deleteCard` - `(req:{set: Set._id, card : Flashcard._id}, res{Flashcard})` - UNIMPLEMENTED

// - `/deleteSet` - `(req:{_id}, res{})` - UNIMPLEMENTED


// - `/getCard` - `(req:{card : Flashcard._id}, res{Flashcard})` - UNIMPLEMENTED

// - `/editCard` - `(req:{term : String, definition : Stringt}, res{})` - UNIMPLEMENTED

// - `/updateProfficiency` - `(req:{profficiency : Number}, res{})` - UNIMPLEMENTED


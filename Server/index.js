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
        console.log("/createUser FN:" + firstName + " LN:" + lastName + " ID:" + username + " PW:" + password);

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
});

// - `/getUsers` - `(req:{ids : [User._id]}, res{users : [User]})` - UNTESTED
app.get('/getUsers', async (req, res) => {
    try{
        const ids = req.body.ids;
        console.log("/getUsers ids: " + ids);

        let userList = [];

        for(const id of ids){
            const user = await User.findById(id);
            userList.push({
                firstName : user.firstName,
                lastName : user.lastName,
                username : user.username,
                _id : user._id
            });
        }
        res.send(userList);
    }
    catch (error){
        res.status().send(error);
        console.log(error);
    }
})

// - `/getUser` - `(req:{_id : User._id}, res{User})` - UNTESTED
app.get('/getUser', async (req, res) => {
    try{
        const id = req.body._id;
        console.log("/getUser id: " + id);

        const user = await User.findById(id);

        let retUser = {
            firstName : user.firstName,
            lastName : user.lastName,
            username : user.username,
            _id : user._id
        }

        res.send(retUser);
    }
    catch (error){
        res.status().send(error);
        console.log(error);
    }
})

// - `/getUserByUsername` - `(req:{username : String}, res{User})` - UNTESTED
app.get('/getUserByUsername', async (req, res) => {
    try{
        const username = req.body.username;
        console.log("/getUserByName UN: " + username);

        const user = await User.findOne({username : username});

        let retUser = {
            firstName : user.firstName,
            lastName : user.lastName,
            username : user.username,
            _id : user._id
        }
        res.send(retUser);
    }
    catch (error){
        res.status().send(error);
        console.log(error);
    }
})

// `/loginUser` - `(req:{username : String, password : String}, res{User})` - UNTESTED
app.get('/loginUser', async (req, res) => {
    try{
        const username = req.body.username;
        const password = req.body.password
        console.log("/getUserByName UN: " + username + " PW: " + password);

        const user = await User.findOne({username : username, password : password});

        res.send(user);
    }
    catch (error){
        res.status().send(error);
        console.log(error);
    }
})

// - `/deleteUser` - `(req:{_id}, res{})` - UNTESTED 
app.delete('/deleteUser', async (req, res) =>{
    try{
        const _id = req.body._id;
        console.log("/deleteUser _id: " + _id);

        const deletedUser = await User.deleteOne({_id : _id});

        res.send(deletedUser);
    }
    catch(error){
        res.status().send(error);
        console.log(error);
    }
});


// - `/createFolder` - `(req : {title : String, parent : Folder._id}, res{folder : Folder})` - UNTESTED
app.post('/createFolder', async (req, res) => {
    try{
        const title = req.body.title;
        const parent = req.body.parent;
        const children = [];
        const sets = [];
        console.log("/createFolder Title: " + title + " parent: " + parent);

        const folder = new Folder(title, parent, children, sets);
        await folder.save();

        res.send(folder);
    }
    catch(error){
        res.status().send(error);
        console.log(error);
    }
});

// - `/getFolderByID` - `(req : {_id}, res : {title : String, parent : SmallFolder, children : [SmallFolder], sets : [SmallSet]})` - UNIMPLEMENTED
app.get('/getFolderByID', async (req, res) => {
    try{
        
    }
    catch (error){
        res.status().send(error);
        console.log(error);
    }
});

// - `/editChildren` - `(req : {_id, children [Folder._id]}, res {})` - UNIMPLEMENTED

// - `/editSets` - `(req : {_id, sets [Set._id]}, res {})` - UNIMPLEMENTED

// - `/deleteFolder` - `(req:{_id}, res{})` - UNTESTED
app.delete('/deleteFolder', async (req, res) =>{
    try{
        const id = req.body._id;
        console.log("/deleteFolder _id: " + id);
        
        // Recursivly delete all children.
        deleteFolder(id);
    }
    catch(error){
        res.status().send(error);
        console.log(error);
    }
});

async function deleteFolder(id){
    const folder = await Folder.findById(id);
    
    for(const child of folder.children){
        deleteFolder(child._id);
    }

    for(const set of folder.sets){
        const set = await Set.findByIdAndDelete(set);

        deleteSet(set._id);
    }

    await Folder.findByIdAndDelete(folder);
}

// - `/createClass` - `(req : {owner : User._id, teachers : [User._id], students : [User._id]}, res {})` - UNIMPLEMENTED
app.post('/create', async (req, res) => {
    try{

    }
    catch(error){
        res.status().send(error);
        console.log(error);
    }
});

// - `/getClass` - `(req : {}, res {})` - UNIMPLEMENTED
app.get('', async (req, res) => {
    try{
        
    }
    catch (error){
        res.status().send(error);
        console.log(error);
    }
})

// - `/editStudents` - `(req : {students : [User._id]}, res {})` - UNIMPLEMENTED

// - `/editTeachers` - `(req : {teachers : [User._id]}, res {})` - UNIMPLEMENTED

// - `/deleteClass` - `(req : )`
app.delete('/deleteClass', async (req, res) =>{
    try{

    }
    catch(error){
        res.status().send(error);
        console.log(error);
    }
});

// - `/createSet` - `(req:{title : String, description : String, flashcards : [Flashcard]}, res{})` - UNIMPLEMENTED
app.post('/create', async (req, res) => {
    try{

    }
    catch(error){
        res.status().send(error);
        console.log(error);
    }
});

// - `/getSet` - `(req:(id : Set._id), res(Set, [Flashcard]))` - UNTESTED
app.get('/getSet', async (req, res) => {
    try{
        const id = req.body.id;

        console.log("/getSet ID: " + id);

        const set = await Set.findById(id);

        res.send(set);
    }
    catch (error){
        res.status().send(error);
        console.log(error);
    }
})

// - `/editTitle` - `(req:{title : String}, res{})` - UNIMPLEMENTED

// - `/editDescription` - `(req:{description : String}, res{})` - UNIMPLEMENTED

// `/addCard` - `(req:{set : Set._id, term : String, definition : String}, res:{_id : Flashcard._id})` - UNIMPLEMENTED
app.post('/addCard', async (req, res) => {
    try{

    }
    catch(error){
        res.status().send(error);
        console.log(error);
    }
});

// `/remove card` = `(req:{set : Set._id, flashcard : Flashcard._id}, res{})`
app.delete('/deleteSet', async (req, res) =>{
    try{

    }
    catch(error){
        res.status().send(error);
        console.log(error);
    }
});

// - `/deleteSet` - `(req:{id : Set._id}, res{})` - UNTESTED
app.delete('/deleteSet', async (req, res) =>{
    try{
        const id = req.body.id;
        console.log("/deleteSet id: " + id);

        deleteSet(id);
    }
    catch(error){
        res.status().send(error);
        console.log(error);
    }
});

function deleteSet(id){

    const set = Set.findById(id)

    for(const card of set){
        Flashcard.findByIdAndDelete(card._id);
    }

    Set.findByIdAndDelete(id);
}


// - `/getCard` - `(req:{id : Flashcard._id}, res{Flashcard})` - UNTESTED
app.get('', async (req, res) => {
    try{
        const id = req.body.card;

        const card = await Flashcard.findById(id);

        res.send(card);
    }
    catch (error){
        res.status().send(error);
        console.log(error);
    }
})

// - `/editCard` - `(req:{set : Set._id, term : String, definition : Stringt}, res{})` - UNIMPLEMENTED

// - `/updateProfficiency` - `(req:{profficiency : Number}, res{})` - UNIMPLEMENTED

// - `/deleteCard` - `(req:{set: Set._id, card : Flashcard._id}, res{Flashcard})` - UNIMPLEMENTED
app.delete('/deleteCard', async (req, res) =>{
    try{

    }
    catch(error){
        res.status().send(error);
        console.log(error);
    }
});

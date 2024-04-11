# Run instructions:
If everything is set up as expected, you should be able to type `node index.js` into your terminal from `Quiztopia/Server/`

# Database calls:
## Schema:

### User
Data:
- `_id`
- `firstName : String` - The User's first name.
- `lastName : String` - The User's last name.
- `userName : String` - The User's username.
- `password : String` - The User's password.
- `flashcardFolders : FlashcardFolder` - The root folder containing the user's flashcard sets and folders.
- `classes : [Class]` - A list of the user's classes.

Database Calls:
- `/getUserByUserName` - `(req:{userName}, res{User})` - UNIMPLEMENTED
- `/createUser` - `(req:{firstName : String, lastName : String, userName : String, password : String}, res{})` - UNIMPLEMENTED
- `/deleteUser` - `(req:{_id}, res{})` - UNIMPLEMENTED
- `/getUsers` - `(req:{ids : [User._id]}, res{users : [User]})` - UNIMPLEMENTED
- `/___` - `(req:{}, res{})` - // If you need other calls, lmk.


### Folder
Data:
- `_id`
- `title : String` - The name of the folder.
- `parent : Folder` - The parent folder of this folder. If it is the root folder, store self.
- `children : [Folder]` - The child folders of this folder.
- `sets : [Set]` - The Sets stored in this folder.

Database Calls:
- `/getFolderByID` - `(req : {_id}, res : {title : String, parent : SmallFolder, children : [SmallFolder], sets : [SmallSet]})` - UNIMPLEMENTED
- `/getCopy` - `(req : {_id}, res {Folder._id})` - UNIMPLEMENTED
- `/createFolder` - `(req : {title : String, parent : Folder._id}, res{})` - UNIMPLEMENTED
- `/editChildren` - `(req : {_id, children [Folder._id]}, res {})` - UNIMPLEMENTED
- `/editSets` - `(req : {_id, sets [Set._id]}, res {})` - UNIMPLEMENTED
- `/deleteFolder` - `(req:{_id}, res{})` - UNIMPLEMENTED
- `/___` - `(req:{}, res{})` - // If you need other calls, lmk.

SmallFolder = `{title : String, folderID : Folder._id}`


### Class
Data:
- `_id`
- `root : Folder` - The root folder of the class that contains each folder, and set in the Class.
- `owner : [User]` - The owner of the class.
- `teachers : roster` - The users that are given admin access for grading and examination.
- `students : roster` - The Users that are allowed to view the class.

Database Calls:
- `/createClass` - `(req : {owner : User._id, teachers : [User._id], students : [User._id]}, res {})` - UNIMPLEMENTED
- `/getClass` - `(req : {}, res {})` - UNIMPLEMENTED
- `/editStudents` - `(req : {students : [User._id]}, res {})` - UNIMPLEMENTED
- `/editTeachers` - `(req : {teachers : [User._id]}, res {})` - UNIMPLEMENTED
- `/___` - `(req:{}, res{})` - // If you need other calls, lmk.

### Roster
Data:
- `_id`
- `parent : Class` - The owner of the Roster
- `users : [User]` - The users in the roster.

Server Calls:
- `/getRoster` - `(req:{users : [User]}, res{})` - UNIMPLEMENTED
- `/editRoster` - `(req:{_id, users : Ow[User]}, res{_id})` - UNIMPLEMENTED
- `/___` - `(req:{}, res{})` - UNIMPLEMENTED
- `/___` - `(req:{}, res{})` - // If you need other calls, lmk.

### Set
Data:
- `_id`
- `title : String` - The name of this flashcard set.
- `description : String` - An optional description describing this set.
- `flashcards : [Flashcard]` - The flashcards in this set.

Database Calls:
- `/createSet` - `(req:{title : String, description : String, flashcards : [Flashcard]}, res{})` - UNIMPLEMENTED
- `/editTitle` - `(req:{title : String}, res{})` - UNIMPLEMENTED
- `/editDescription` - `(req:{description : String}, res{})` - UNIMPLEMENTED
- `/editCards` - `(req:{oldCard : Flashcard._id, newCard : Flashcard}, res{})` - UNIMPLEMENTED
- `/deleteSet` - `(req:{_id}, res{})` - UNIMPLEMENTED
- `/___` - `(req:{}, res{})` - // If you need other calls, lmk.

SmallSet : `{title : String, _id : Set._id}`

### Flashcard
Data:
- `_id`
- `term : String` - The front of the flashcard.
- `definition : String` - The back of the flashcard.
- `profficiency : number` - // TODO: figure out how to map to each user.

Database Calls:
- `/getCard` - `(req:{card : Flashcard._id}, res{})` - UNIMPLEMENTED
- `/editCard` - `(req:{term : String, definition : Stringt}, res{})` - UNIMPLEMENTED
- `/updateProfficiency` - `(req:{profficiency : Number}, res{})` - UNIMPLEMENTED
- `/___` - `(req:{}, res{})` - UNIMPLEMENTED
- `/___` - `(req:{}, res{})` - // If you need other calls, lmk.

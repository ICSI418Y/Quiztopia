# Description

// TODO

# Implementation:

## Data Structures and Database Calls (Danny):

### Schema:

#### User
Data:
- `firstName : String` - The User's first name.
- `lastName : String` - The User's last name.
- `userName : String` - The User's username.
- `password : String` - The User's password.
- `flashcardFolders : FlashcardFolder` - The root folder containing the user's flashcard sets and folders.
- `classes : [Class]` - A list of the user's classes.

Database Calls:
- `/getUser` - (req:{}, res{}) - UNIMPLEMENTED
- `/createUser` - (req:{}, res{}) - UNIMPLEMENTED
- `/deleteUser` - (req:{}, res{}) - UNIMPLEMENTED
- `/___` - (req:{}, res{}) - UNIMPLEMENTED

#### Flashcard Folder
Data:
- `parentFolder : FlashcardFolder` - The parent folder of this folder. If it is the root folder, store self.
- `flashcardFolders: [FlashcardFolder]` - 
- `flashcardSet : [flashcardSet]` - 

Database Calls:
- `/getFolder` - (req:{}, res{}) - UNIMPLEMENTED
- `/createFolder` - (req:{}, res{}) - UNIMPLEMENTED
- `/deleteFolder` - (req:{}, res{}) - UNIMPLEMENTED
- `/___` - (req:{}, res{}) - UNIMPLEMENTED

#### Class
Data:
- `flashcardFolder: FlashcardFolder` - 
- `teachers : [User]` - 
- `students : [User]` - 

Database Calls:
- `/getClass` - (req:{}, res{Class}) - UNIMPLEMENTED
- `/addStudent` - (req:{}, res{}) - UNIMPLEMENTED
- `/addTeacher` - (req:{}, res{}) - UNIMPLEMENTED
- `/removeStudent` - (req:{}, res{}) - UNIMPLEMENTED
- `/removeTeacher` - (req:{}, res{}) - UNIMPLEMENTED
- `/___` - (req:{}, res{}) - UNIMPLEMENTED

#### Flashcard Set
Data:
- `title : String` -
- `description : String` - 
- `flashcards : [Flashcard]` - 

Database Calls:
- `/___` - (req:{}, res{}) - UNIMPLEMENTED

#### Flashcard
Data:
- `term : String` - The front of the flashcard.
- `definition : String` - The back of the flashcard.
- `profficiency : number` - //TODO: figure out how to map to each user.

Database Calls:
- `/___` - (req:{}, res{}) - UNIMPLEMENTED

## Graphic Design and UI (Rusho):

### Tasks:
- Create Mockups of pages, design a logo, and choose a color scheme
- When other team members say that a page is done, work with them to make their created page conform to your mockups. (i.e. reorganize their working page to make it look pretty and cohesive with the other pages.)

## Flashcard Creation and Activities (Danica):

### Tasks:
- Create `/CreateSet` - Create a page that allows the user to create a valid set of flashcards.
- Create `/ViewSet` - Create a page that allows the user to view, edit, add, and remove flashcards, and go to the different Practice pages.
- Create Practice Set Pages - Create different pages that allow the user to practice their set in different ways. You can make different practice methods, but include at least: review flashcards, practice-test flashcards, and test flashcards.

## Flashcard Organization (Matthew):

### Tasks:
- `/ViewFolder` - Create a page that allows the user to navigate thru their different flashcard folders. Create methods that allow the user to create, and remove their folders. 
- Create a method that opens the selected flashcard set.
- Create an endpoint that allows the user to create a copy of a set, or folder.

## Class Setup (Matthew):

### Tasks:
- Create `/CreateClass` - Create a page that allows the user to make a valid Class. 
- Create `/ViewClass` - Create a page that allows a user to view their Class. 
- Create `/EditClass` - Create a page that lets the user: add/remove students, add/remove teachers, add/remove/edit flashcardFolders/Sets. 

## User Authentication (Mendel):

### Tasks:
- Create `/Signup` - Create a page that allows the user to sign up for the site.
- Create `/Login` - Create a page that allows the user to log in. Must store the loggedInUser.
- Create `/DeleteAccount` - Create a page that allows the user to delete their account. Make sure they can't do it on accident, and that they cannot delete other users.
- When other teammates mark their pages as done, implement conditional rendering on the required features.


# Completed Pages:

PAGE NAME | OWNER | FUNCTIONALITY DONE | USER AUTHENTICATION DONE | GRAPHIC DESIGN DONE |
`/Signup` | Mendel | X | X | X |
`/Login` | Mendel | X | X | X |
`/DeleteAccount` | Mendel | X | X | X |
`/CreateSet` | Danica | X | X | X |
`/ViewSet` | Danica | X | X | X |
`/ReviewSet` | Danica | X | X | X |
`/PraciceTestSet` | Danica | X | X | X |
`/TestSet` | Danica | X | X | X |
`/ViewFolder` | Matthew | X | X | X |
`/CreateClass` | Matthew | X | X | X |
`/ViewClass` | Matthew | X | X | X |
`/EditClass` | Matthew | X | X | X |

# How to use:

If everything is set up correctly, you should be able to call `npm start` from the `./quiztopia` directory, and `node index.js` from the `./Server` directory. This should open port 3000 for sending and receiving the client-side information, and port 9000 for sending and receiving server side information.

## Dependencies:

### quiztopia/

We used the default packages provided by `npx create-react-app quiztopia`, as well as Bootstrap (imported with `npm i --save bootstrap`).

### Server/

We used the default packages provided by `npm init`, as well as the Express, Mongoose, NodeMON, dotenv, and cors (imported with the command `npm i --save express mongoose nodemon dotenv cors`).


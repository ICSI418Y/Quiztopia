# Description

// TODO

# Implementation:

## Note about client side pages:
If you're page is conditionally renderd (only does something if the user is logger in).
You should use the Template function, which automatically renders the content for you only if the user is logged in.

### Documentation
`function Template(title, content)`

- title is the `h1` title at the beggining of the page.
    An example would be `"login"`.
- content is the html/react that should be condionally renderd.
    An example would be `<div>content</div>`.

### Usage:
Without template:
```jsx
import React from "react";

function YourPage() {
    // see if use is logged in
    const loggedInUser = localStorage.getItem('loggedInUser');
    // state management

    return (<>
        {LoggedInUser != null &&
        <div>
            <h1>Your Title</h1>
            <p>Very important content that only logged in users can see.</p>
        </div>}
        {LoggedInUser == null &&
        <div>
            <h1>Your Title</h1>
            <p>Only logged in user can see this content, please login to view this page.</p>
        </div>
        }
    </>)
}

export default YourPage;
```
With template:
```jsx
import React from "react";

function YourPage() {
    // state management

    return Template("Your Page",
        <div>
            <p>Very important content that only logged in users can see.</p>
        </div>)
}

export default YourPage;
```

## Data Structures and Database Calls (Danny):

## Tasks:
- Create the schema, and server calls, specified in `./Server/README.md`.

## Graphic Design and UI (Rusho):

### Tasks:
- Create the base router for our app.
- Create mock-ups of pages, design a logo, and choose a color scheme
- When other team members say that a page is done, work with them to make their created page conform to your mock-ups. (i.e. reorganize their working page to make it look pretty and cohesive with the other pages.)

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
:--- | :---: | :---: |:---: |:---: |
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

We used the default packages provided by `npx create-react-app quiztopia`, as well as Bootstrap, Axios, and React Router Dom (imported with `npm i --save bootstrap axios react-router-dom`).

### Server/

We used the default packages provided by `npm init`, as well as the Express, Mongoose, NodeMON, dotenv, and cors (imported with the command `npm i --save express mongoose nodemon dotenv cors`).



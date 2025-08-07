📚 Book Manager
A simple, full-stack web application for managing a collection of books. This project demonstrates a basic RESTful API built with Node.js and Express, serving a vanilla JavaScript frontend. The application allows users to create, read, update, and delete (CRUD) book entries.

✨ Key Features
List Books: View all books in the collection on the main page.

Add a Book: Add new books with a title, author, and details.

View Details: Click on a book to see its dedicated details page.

Update Information: Edit the title, author, and details of an existing book.

Delete a Book: Remove a book from the collection.

Deletion History: View a history of all books that have been deleted.

In-Memory Storage: The application uses in-memory arrays for data storage. Note: All data will be lost when the server is restarted.

🛠️ Technologies Used
Backend:

Node.js

Express.js

Frontend:

HTML5

CSS3 (via style.css)

Vanilla JavaScript (ES6+) with the Fetch API

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites
You need to have Node.js and npm (Node Package Manager) installed on your computer.

Installation & Setup
Clone the repository or create the project files.
Create a new project directory and set up the following file structure:
/book-manager
├── public/
│   ├── index.html
│   ├── book.html
│   ├── history.html
│   ├── script.js
│   └── style.css  (You will need to create this file)
└── server.js
Populate the files:

Place the Express/Node.js code into server.js.

Place the main page HTML into public/index.html.

Place the book details page HTML into public/book.html.

Place the history page HTML into public/history.html.

Place the frontend JavaScript logic into public/script.js.

Create an empty public/style.css or add your own styles.

Navigate to the project directory:
cd book-manager
Initialize a Node.js project:
This command creates a package.json file.
npm init -y
Install Express.js:
npm install express
Run the server:
node server.js
Open the application in your browser:
Navigate to http://localhost:3000. You should see the Book Manager application running!

📝 API Endpoints
The backend server provides the following RESTful API endpoints:

Method	Endpoint	Description
GET	/api/books	Retrieves a list of all books.
GET	/api/books/:id	Retrieves a single book by its unique ID.
POST	/api/books	Creates a new book. Expects a JSON body.
PUT	/api/books/:id	Updates an existing book. Expects a JSON body.
DELETE	/api/books/:id	Deletes a book by its ID.
GET	/api/history	Retrieves the history of deleted book titles.

Export to Sheets
Example POST / PUT Body:
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "details": "A novel about the American dream."
}
💡 Future Improvements
Persistent Storage: Replace the in-memory arrays with a database like MongoDB, PostgreSQL, or SQLite to make the data persistent.

UI/UX Enhancements: Improve styling and add more interactive elements like modals for forms and confirmation dialogs for deletions.

Input Validation: Add more robust validation on both the client and server sides.

Error Handling: Implement more detailed error handling and feedback for the user.

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// In-memory store
let books = [];
let history = [];

app.get('/api/books', (req, res) => res.json(books));

app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

app.post('/api/books', (req, res) => {
  const { title, author, details } = req.body;
  const newBook = {
    id: Date.now(),
    title,
    author,
    details,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });

  const { title, author, details } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  book.details = details || book.details;
  book.updatedAt = new Date().toISOString();

  res.json(book);
});

app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  const deletedBook = books.splice(index, 1)[0];
  history.push({
    title: deletedBook.title,
    deletedAt: new Date().toISOString()
  });

  res.status(204).send();
});

app.get('/api/history', (req, res) => res.json(history));

app.listen(port, () => {
  console.log(`📚 Book Manager running at http://localhost:${port}`);
});

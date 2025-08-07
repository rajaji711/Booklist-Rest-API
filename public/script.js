const apiUrl = '/api/books';

document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname.endsWith('index.html') || location.pathname === '/') {
    fetchBooks();
  } else if (location.pathname.endsWith('book.html')) {
    fetchBookDetails();
  } else if (location.pathname.endsWith('history.html')) {
    fetchHistory();
  }
});

// 🏠 Home Page
function fetchBooks() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('bookList');
      list.innerHTML = '';
      data.forEach(book => {
        const li = document.createElement('li');
        li.classList.add('card');
        li.innerHTML = `
          <strong>${book.title}</strong> by ${book.author}<br>
          <small>Created: ${new Date(book.createdAt).toLocaleString()}<br>
          Updated: ${new Date(book.updatedAt).toLocaleString()}</small><br>
          <a href="book.html?id=${book.id}" class="link">📖 View</a>
        `;
        list.appendChild(li);
      });
    });
}

function toggleAddForm() {
  document.getElementById('addForm').classList.toggle('hidden');
}

function addBook() {
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const details = document.getElementById('details').value.trim();

  if (!title || !author) return alert('Please enter title and author');

  fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, details })
  }).then(() => location.reload());
}

// 📖 Book Page
function fetchBookDetails() {
  const id = new URLSearchParams(location.search).get('id');
  fetch(`${apiUrl}/${id}`)
    .then(res => res.json())
    .then(book => {
      const div = document.getElementById('bookDetails');
      div.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Details:</strong> ${book.details || 'No details provided.'}</p>
        <small>Created: ${new Date(book.createdAt).toLocaleString()}<br>
        Updated: ${new Date(book.updatedAt).toLocaleString()}</small>
        <h3>Edit Book</h3>
        <input type="text" id="editTitle" value="${book.title}">
        <input type="text" id="editAuthor" value="${book.author}">
        <textarea id="editDetails">${book.details || ''}</textarea>
        <button class="btn" onclick="updateBook(${book.id})">✏️ Update</button>
        <button class="btn" onclick="deleteBook(${book.id})">🗑️ Delete</button>
        <br><br>
        <a href="index.html" class="link">🔙 Back to List</a>
      `;
    });
}

function updateBook(id) {
  const title = document.getElementById('editTitle').value;
  const author = document.getElementById('editAuthor').value;
  const details = document.getElementById('editDetails').value;

  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, details })
  }).then(() => location.href = 'index.html');
}

function deleteBook(id) {
  fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
    .then(() => location.href = 'index.html');
}

// 🕓 History Page
function fetchHistory() {
  fetch('/api/history')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('historyList');
      list.innerHTML = '';
      data.forEach(entry => {
        const li = document.createElement('li');
        li.classList.add('card');
        li.innerHTML = `<strong>${entry.title}</strong><br><small>Deleted at: ${new Date(entry.deletedAt).toLocaleString()}</small>`;
        list.appendChild(li);
      });
    });
}

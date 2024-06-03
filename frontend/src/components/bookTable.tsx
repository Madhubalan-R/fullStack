import React, { useState, useEffect } from 'react';
import "../styles/table.css";

interface Book {
  ID: number;
  bookname: string;
}

const BookTable: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({ ID: 0, bookname: '' });
  const [error, setError] = useState('');
  const [addBook, setAddBook] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3090/admin/show', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError('Error fetching books');
      }
    };

    fetchBooks();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook({ ...newBook, [e.target.name]: e.target.value });
  };

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3090/admin/createBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newBook)
      });
      if (!response.ok) {
        throw new Error('Error adding book');
      }
      const addedBook = await response.json();
      setBooks([...books, addedBook]);
      setNewBook({ ID: 0, bookname: '' });
      setAddBook(false);
    } catch (err) {
      setError('Error adding book');
    }
  };

  const handleDelete = async (bookId: number) => {
    try {
      await fetch(`http://localhost:3090/admin/deleteBook/${bookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBooks(books.filter(book => book.ID !== bookId));
    } catch (err) {
      setError('Error deleting book');
    }
  };

  return (
    <>
      <div className='TableContainer'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="BookHead">
          <h2>Book List</h2>
          <button type="button" className="BookButton" onClick={() => setAddBook(true)}>Add New Book</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Book Name</th>
              <th>Actions</th>
            </tr><hr/>
          </thead>
          <tbody>
            {books.map((book) => (<>
              <tr key={book.ID}>
                <td>{book.ID}</td>
                <td>{book.bookname}</td>
                <td>
                  <button onClick={() => handleDelete(book.ID)} className='cancelButton'>Delete</button>
                </td>
              </tr><hr/></>
            ))}
          </tbody>
        </table>
      </div>
      {addBook && (
        <div>
          <h3>Add new Book</h3>
          <form onSubmit={handleAddBook}>
            <div>
              <label>Book Name:</label>
              <input
                type="text"
                name="bookname"
                value={newBook.bookname}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className='addButton'> Add Book</button>
            <button type="button" className='cancelButton' onClick={() => { setAddBook(false) }}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
};

export default BookTable;

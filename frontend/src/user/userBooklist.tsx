import React, { useState, useEffect } from 'react';
import "../styles/table.css";

interface Book {
  ID: number;
  bookname: string;
}

const UserBooklist: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3090/user/books', {
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
  return (
    <>
      <div className='TableContainer'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="BookHead">
          <h2>Book List</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Book Name</th>
            </tr><hr/>
          </thead>
          <tbody>
            {books.map((book) => (<>
              <tr key={book.ID}>
                <td>{book.ID}</td>
                <td>{book.bookname}</td>
              </tr><hr/></>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserBooklist;

import React, { useState, useEffect } from 'react';
import "../styles/table.css";

interface User {
  ID: number;
  username: string;
}

interface Book {
  ID: number;
  bookname: string;
}

interface UserBook {
  UBID: number;
  username: User;
  bookname: Book;
  startdate: string;
  enddate: string;
}

const BorrowBookList: React.FC = () => {
  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [error, setError] = useState('');
  const [newBorrow, setNewBorrow] = useState({
    username: '',
    bookname: '',
    startdate: '',
    enddate: ''
  });
  const [isBorrowing, setIsBorrowing] = useState(false);

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await fetch('http://localhost:3090/user/borrowed', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setUserBooks(data);
      } catch (err) {
        setError('Error fetching user books');
      }
    };

    fetchUserBooks();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBorrow({ ...newBorrow, [e.target.name]: e.target.value });
  };

  const handleBorrowBook = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3090/user/borrow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newBorrow)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error borrowing book');
      }
      const addedBorrow = await response.json();
      
      // Update the state to reflect the newly borrowed book
      const newUserBook: UserBook = {
        UBID: addedBorrow.newUserBook.UBID,
        username: addedBorrow.newUserBook.username,
        bookname: addedBorrow.newUserBook.bookname,
        startdate: addedBorrow.newUserBook.startdate,
        enddate: addedBorrow.newUserBook.enddate,
      };
      setUserBooks([...userBooks, newUserBook]);

      setNewBorrow({
        username: '',
        bookname: '',
        startdate: '',
        enddate: ''
      });
      setIsBorrowing(false);
    } catch (err: any) {
      setError(`Error borrowing book: ${err.message}`);
    }
  };

  return (
    <>
      <div className='TableContainer'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="BookHead">
          <h2>Borrowed Books</h2>
          <button type="button" className="BookButton" onClick={() => setIsBorrowing(true)}>Borrow New Book</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Book Name</th>
              <th>User ID</th>
              <th>Username</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
            <hr />
          </thead>
          <tbody>
            {userBooks.map((userBook) => (
              <React.Fragment key={userBook.UBID}>
                <tr>
                  <td>{userBook.bookname.ID}</td>
                  <td>{userBook.bookname.bookname}</td>
                  <td>{userBook.username.ID}</td>
                  <td>{userBook.username.username}</td>
                  <td>{new Date(userBook.startdate).toLocaleDateString()}</td>
                  <td>{new Date(userBook.enddate).toLocaleDateString()}</td>
                </tr>
                <hr />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {isBorrowing && (
        <div className='borrowForm'>
          <h3>Borrow New Book</h3>
          <form onSubmit={handleBorrowBook}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={newBorrow.username}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Book Name:</label>
              <input
                type="text"
                name="bookname"
                value={newBorrow.bookname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                name="startdate"
                value={newBorrow.startdate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="date"
                name="enddate"
                value={newBorrow.enddate}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className='addButton'>Borrow Book</button>
            <button type="button" className='cancelButton' onClick={() => setIsBorrowing(false)}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
};

export default BorrowBookList;

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
  const [isEditing, setIsEditing] = useState(false);
  const [editBorrow, setEditBorrow] = useState<UserBook | null>(null);

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
    const { name, value } = e.target;
    if (isEditing && editBorrow) {
      setEditBorrow({ ...editBorrow, [name]: value });
    }
  };

  const handleDeleteBook = async (UBID: number) => {
    try {
      const response = await fetch(`http://localhost:3090/admin/deleteUB/${UBID}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Error deleting book');
      }
      setUserBooks(userBooks.filter(userBook => userBook.UBID !== UBID));
    } catch (err: any) {
      setError(`Error deleting book: ${err.message}`);
    }
  };

  const handleEditBook = (userBook: UserBook) => {
    setEditBorrow(userBook);
    setIsEditing(true);
  };

  const handleUpdateBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBorrow) return;

    try {
      const response = await fetch(`http://localhost:3090/admin/updateUB/${editBorrow.UBID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(editBorrow)

      });
      console.log(response);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating book');
      }
      const updatedBorrow = await response.json();

      setUserBooks(userBooks.map(userBook => (userBook.UBID === updatedBorrow.UBID ? updatedBorrow : userBook)));
      setIsEditing(false);
      setEditBorrow(null);
    } catch (err: any) {
      setError(`Error updating book: ${err.message}`);
    }
  };

  return (
    <>
      <div className='TableContainer'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="BookHead">
          <h2>Borrowed Books</h2>
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
              <th>Actions</th>
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
                  <td>
                    <button onClick={() => handleEditBook(userBook)}>Edit</button>
                    <button onClick={() => handleDeleteBook(userBook.UBID)}>Delete</button>
                  </td>
                </tr>
                <hr />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {isEditing && (
        <div className='borrowForm'>
          <h3>Edit Book</h3>
          <form onSubmit={handleUpdateBook}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={editBorrow?.username.username}
                onChange={handleInputChange}
                required
                disabled // Disable editing username during update
              />
            </div>
            <div>
              <label>Book Name:</label>
              <input
                type="text"
                name="bookname"
                value={editBorrow?.bookname.bookname}
                onChange={handleInputChange}
                required
                disabled // Disable editing book name during update
              />
            </div>
            <div>
              <label>Start Date:</label>
              <input
                type="date"
                name="startdate"
                value={editBorrow?.startdate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>End Date:</label>
              <input
                type="date"
                name="enddate"
                value={editBorrow?.enddate}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className='addButton'>Update Book</button>
            <button type="button" className='cancelButton' onClick={() => { setIsEditing(false); setEditBorrow(null); }}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
};

export default BorrowBookList;

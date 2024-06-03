import React, { useState, useEffect } from 'react';
import "../styles/table.css";

interface User {
  ID: number;
  username: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch users from the backend
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3090/admin/viewUser', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className='TableContainer'>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="BookHead">
          <h2>User List</h2>
        </div>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Name</th>
            </tr><hr/>
          </thead>
          <tbody>
            {users.map((user) => (<>
              <tr key={user.ID}>
                <td>{user.ID}</td>
                <td>{user.username}</td>
              </tr><hr/></>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;

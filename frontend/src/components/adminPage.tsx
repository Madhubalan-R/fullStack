import React, { useEffect } from 'react';
import "../styles/adminPage.css"
import BookTable from './bookTable';
import UserTable from './userTable';
import Logo from './logo';
import UserBookTable from './userbookTable';
import { useNavigate } from 'react-router-dom';

/*const BackButton: React.FC = () => {
  const handleAdminClick = () => {
    window.location.href = '/';
  };

  return (
    <button type='button' className='backButton' onClick={handleAdminClick}>
      Back
    </button>
  );
};*/

const UserBookData: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin'); // Redirect to login page if token is not found
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin'); // Redirect to login page after logout
  };

return (<>
    <Logo/><div className='userDashboard'>
    <div className='navbar'>
      <h1>Welcome your Dashboard</h1>
      <button onClick={logout} className='backButton'>Logout</button>
      </div>
      <div className='UserDatacontainer'>
      <UserTable/>
      <BookTable/>

      </div>
      <div className='bookImages'>
        <img src ="https://m.media-amazon.com/images/I/71UsNYT1aJL._AC_UF1000,1000_QL80_.jpg" alt="Book1" />
        <img src ="https://m.media-amazon.com/images/I/51tHwdDXlHL._AC_UF1000,1000_QL80_.jpg" alt="Book2" />
        <img src ="https://bestofusedbooks.com/cdn/shop/products/d9fb7eab-2b0d-48a6-9646-89de59c55a93_300x300.jpg?v=1667296989" alt="Book3" />
        <img src ="https://m.media-amazon.com/images/I/51bxIHH+R4L.jpg" alt="Book4" />
        <img src ="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1444685288i/27029842.jpg" alt="Book5" />
        <img src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT09pE3RsK63sIztTs46vyVt_MyCTpcR9kzhw&s" alt="Book6" />
        <img src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvIMOQ5lYr15YIdhY7nNQDMzfc1pkUpe_OA&s" alt="Book7" />
        <img src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZIgm3EjwesTWg8OFDXE5hyEUWxXPC8QCYQ&s" alt="Book8" />
        <img src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl_K8fRqhdPb8EU_aXz1VYjagTsqo1Qici2C7B4MAXqRz11p2DDi1sBZjoessTvBugVwY&usqp=CAU" alt="Book9" />
      </div>
      <UserBookTable/>
      </div>
    </>
  );
};

export default UserBookData;

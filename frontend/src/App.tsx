import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import AdminPage from './components/adminPage';
import UserDetails from './user/userDetails';
import Logo from './components/logo';
import NoPage from './components/noPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import LoginForm from './signup/loginForm';
import AdminSignInForm from './signup/adminSignin';
//import {useHistory} from 'react-router-dom';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLoginSuccess = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };
  return (
    <>
        <Router>
      <Routes>
        <Route path="/admin" element={<AdminSignInForm onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/adminPage" element={token ? <AdminPage /> : <Navigate to="/admin" />}/>
        <Route path="/" element={<SignupForm />} />
        <Route path="/loginForm" element={<LoginForm />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
    </>
  );
};

const AdminButton: React.FC = () => {
  const handleAdminClick = () => {
    window.location.href = '/admin';
  };

  return (
    <div className='AdminNavbar'>
      <FontAwesomeIcon icon={faUser} />
      <a href="/admin" onClick={handleAdminClick}>
        Admin
      </a>
    </div>
  );
};

const SignupForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3090/user/signup', { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href="/UserDetails";
    } catch (err) {
      setError('user already exist');
    }
  };

  const handleSignupClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    window.location.href = '/loginForm';
  };

  return (<>
    <body><Logo/>
    <center><h1>Library Management System</h1></center>
      <div className='container'>
        <div className='bookImage'>
        <img src='./src/contact.png' alt='image' className='bookImage'/>
        </div>
        <form method="post" onSubmit={handleSubmit} className='loginForm'>
          <h1>User signup Form</h1><br />
          <label>
            <input type='text' name='username' className='nameBar' placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
          </label><br />
          <label>
            <input type='password' name='password' className='passwordBar' placeholder='password' onChange={(e) => setPassword(e.target.value)} required />
          </label><br />
          <button type='submit' className='loginButton'>signup</button><br />
          {error && <p>{error}</p>}
          <p>
            I have Account
            <a onClick={handleSignupClick} href='/loginForm'> SIGNIN</a>
          </p>
          <AdminButton />
        </form>
      </div>
    </body></>
  );
};

export default App;

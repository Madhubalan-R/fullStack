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
<script src="validation.js"></script>

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

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    
    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasNumber.test(password)) {
      return 'Password must contain at least one number.';
    }
    if (!hasSpecialChar.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return null; // No validation errors
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3090/user/signup', { username, password });
      localStorage.setItem('token', response.data.token);
      console.log(response);
      window.location.href = "/loginForm";
    } catch (err) {
      setError('User already exists');
    }
  };

  const handleSignupClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    window.location.href = '/loginForm';
  };

  return (<>
  <body>
      <Logo />
      <center><h1>Library Management System</h1></center>
      <div className='container'>
        <div className='bookImage'>
          <img src='./src/contact.png' alt='image' className='bookImage' />
        </div>
        <form method="post" onSubmit={handleSubmit} className='loginForm'>
          <h1>User Signup Form</h1><br />
          <label>
            <input
              type='text'
              name='username'
              className='nameBar'
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label><br />
          <label>
            <input
              type='password'
              name='password'
              className='passwordBar'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label><br />
          <button type='submit' className='loginButton'>Signup</button><br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>
            I have an account
            <a onClick={handleSignupClick} href='/loginForm'> SIGNIN</a>
          </p>
          <AdminButton />
        </form>
      </div>
    </body>
    <script>
      
      </script></>
  );
};

export default App;

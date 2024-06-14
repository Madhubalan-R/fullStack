import React, { useState } from 'react';
import '../styles/signupForm.css';
import Logo from '../components/logo';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3090/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      
      
    });console.log(response);

    if (response.ok) {
      // Redirect to userDetails page on successful signup
      window.location.href = '/userDetails';
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  };

  const handleSignInClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    window.location.href = '/';
  };

  return (
    <>
      <Logo />
      <div className='container'>
        <form onSubmit={handleSubmit} className='loginForm'>
          <h1>User Login Form</h1>
          <label>
            <input type='text' name='username'  className='nameBar' placeholder='username' value={username}  onChange={(e) => setUsername(e.target.value)}required/>
          </label><br/>
          <label>
          <input type='password' name='password'  className='nameBar' placeholder='password' value={password}  onChange={(e) => setPassword(e.target.value)}required/>
         </label><br />
          <button type='submit' className='loginButton' >Login</button><br />
          <p>
            I haven't Account
            <a onClick={handleSignInClick} href='/'> SIGNUP</a>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;


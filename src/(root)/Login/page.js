'use client'
import React, { useState } from 'react';
import './index.css'
import RootLayout from '../layout';
// import Link from 'next/link';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const [showSignUp1, setShowSignUp1] = useState(false);

  // State for the second sign-up form
  const [showSignUp2, setShowSignUp2] = useState(false);

  // Toggle function for the first sign-up form
  const toggleSignUp1 = () => {
    setShowSignUp1(!showSignUp1);
  };

  // Toggle function for the second sign-up form
  const toggleSignUp2 = () => {
    setShowSignUp2(!showSignUp2);
  };
   // Function to handle email input change
   const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Function to handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make HTTP request to authenticate user
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError('Authentication failed'); // Set error message
        throw new Error('Authentication failed');
        
      }
      const data = await response.json();
      const authToken = data.token;
      const authUserId = data.user.id;
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('authUserId', authUserId);

      // Handle successful authentication (redirect, set user state, etc.)
      // For example, you can redirect to another page after successful login
      window.location.href = '/NewEvent';
    } catch (error) {
      console.error('Authentication error:', error.message);
      setError('Invalid username or password'); // Set error message

      // Handle authentication error (display error message, clear inputs, etc.)
    }
  };


  return (
    <>
      <RootLayout>
    <div className='main_container'>
      <div className="login_container">
                <div className="login_section">
                    <div className="coustomer_form">
                        <h2>CUSTOMERS</h2>
                            <form onSubmit={handleLogin} className="login_cous">
                              
                                    <p>Already have an account?</p>
                                    <h2>Login</h2>
                                    <label htmlFor="">Email:</label>
                                    <input 
                                    type="email"
                                    value={username}
                                    onChange={handleUsernameChange}
                                    required/>
                                     

                                    <label htmlFor="">Password:</label>
                                    <input type="password" value={password} onChange={handlePasswordChange} required/>
                                    <button type="submit"  className='cursor_pointer submit_btn'>Login</button>
                                    {error && <p className="error_message">{error}</p>} {/* Render error message */}

                            </form>
                            <div className="sign_btnss">
                                <p >Don’t have an account?</p>
                                <a href="/Sign_Up" className="cursor_pointer">Sign Up</a>

                            </div>
                            <div className="sign_btnss">
                                <p >Forget You Psssword?</p>
                                <a href="/forgot" className="cursor_pointer">Reset Psssword</a>

                            </div>
                            <a href="/Login_org">Or login as <span className='yellow_cr'>Organizer</span> </a>

                        </div>
                </div>
            </div>
    </div>
    </RootLayout>
    </>
  )
}

export default Login

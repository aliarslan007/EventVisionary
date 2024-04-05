'use client'
import React, { useState } from 'react';
import './index.css'
// import Link from 'next/link';
import RootLayout from '../layout';

const Sign_Up = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    // Validate password length
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Call your REST API to submit the form
    try {
      // Make HTTP request to authenticate user
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
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



      // Call your API here and handle success/failure
      alert('SignUp submitted successfully!');
      
      window.location.href = '/NewEvent';
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred while submitting the form');
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
                           
                            
                            {error && <div className="error_message">{error}</div>}
                            <form  onSubmit={handleSubmit} className="login_cous">
                                    <h2>Sign Up</h2>
                                    <label htmlFor="">Email:</label>
                                    <input type="email" 
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)} required/>

                                    <label htmlFor="">Password:</label>
                                    <input type="Password" 
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                                      required/>

                                    <label htmlFor="">Confirm Password:</label>
                                    <input type="Password" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required/>
                                <button type="submit" className='form_btn'>Sign Up</button>

                            </form>
                            <div className="sign_btnss">
                                <p >Already have an account?</p>
                                <a href="/Login" className="cursor_pointer sign_btnss" >Login</a>

                            </div>
                            <a href="/Sign_Up_org">Or Sign up as <span className='yellow_cr'>Organizer</span> </a>
                        </div>
                </div>
            </div>
    </div>
    </RootLayout>
    </>
  )
}

export default Sign_Up

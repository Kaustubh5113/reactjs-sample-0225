'use client';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../lib/firebase';


import { doc, setDoc } from 'firebase/firestore';

import React, { useState, useEffect } from 'react';
import './SignupForm.css';

const SignupForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: '',
    terms: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.terms) {
    alert('Please accept the terms and conditions');
    return;
  }

  if (formData.password !== formData.rePassword) {
    alert('Passwords do not match!');
    return;
  }

  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    const user = userCredential.user;

    // Optional: Save additional user info in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      username: formData.username,
      email: formData.email,
      createdAt: new Date(),
    });

    alert('Signup successful! Redirecting to login...');
    setFormData({
      username: '',
      email: '',
      password: '',
      rePassword: '',
      terms: false,
    });
    onSwitchToLogin();
  } catch (error) {
    console.error('Signup error:', error);
    alert(error.message);
  }
};


  return (
    <div className={`container ${mounted ? 'fadeIn' : ''}`}>
      <form onSubmit={handleSubmit} noValidate>
        <h1>Sign up</h1>

        <div className="input-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder=" "
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
            required
          />
          <label htmlFor="username" className="input-label">Username</label>
        </div>

        <div className="input-group">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <label htmlFor="email" className="input-label">Email</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <label htmlFor="password" className="input-label">Password</label>
        </div>

        <div className="input-group">
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            placeholder=" "
            value={formData.rePassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <label htmlFor="rePassword" className="input-label">Re-enter Password</label>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
          <label htmlFor="terms">I accept the terms &amp; conditions</label>
        </div>

        <button type="submit">Sign up</button>

        <p className="redirectText">
          Already have an account?{' '}
          <span
            className="redirectLink"
            onClick={onSwitchToLogin}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSwitchToLogin()}
          >
            Go to Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;

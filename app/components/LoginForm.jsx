'use client';

import React, { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signOut,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import styles from './LoginForm.module.css';
import SignupForm from './SignupForm';
import TaskBoard from './TaskBoard';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [mounted, setMounted] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showTaskBoard, setShowTaskBoard] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Listen for Firebase auth state changes to keep user logged in on refresh
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setShowTaskBoard(true);
        setShowSignup(false);
      } else {
        setShowTaskBoard(false);
        setShowSignup(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
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
    setLoading(true);

    try {
      await setPersistence(
        auth,
        formData.remember ? browserLocalPersistence : browserSessionPersistence
      );
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      setShowTaskBoard(true);
      setShowSignup(false);
    } catch (error) {
      alert('Login failed: ' + error.message);
      setShowSignup(true);
      setShowTaskBoard(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchToSignup = () => {
    setShowSignup(true);
    setShowTaskBoard(false);
  };

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowTaskBoard(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setShowTaskBoard(false);
    setShowSignup(false);
    setFormData({ email: '', password: '', remember: false });
  };

  if (!mounted) return null;

  return (
    <div className={`${styles.container} ${mounted ? styles.fadeIn : ''}`}>
      {showTaskBoard ? (
        <TaskBoard onLogout={handleLogout} />
      ) : showSignup ? (
        <SignupForm onSwitchToLogin={handleSwitchToLogin} />
      ) : (
        <form className={styles.formWrapper} onSubmit={handleSubmit} noValidate>
          <h1 className={styles.title}>Log in!</h1>

          <label htmlFor="email" className={styles.labelText}>
            Email Address
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              className={styles.input}
              required
              aria-required="true"
            />
          </div>

          <label htmlFor="password" className={styles.labelText}>
            Password
          </label>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className={styles.input}
              required
              aria-required="true"
              minLength={6}
            />
          </div>

          <div className={styles.options}>
            <label className={styles.checkboxWrapper} htmlFor="remember">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Remember me
            </label>
            <div
              className={styles.forgotPassword}
              role="link"
              tabIndex={0}
              onClick={() => alert('Password reset not implemented yet.')}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') &&
                alert('Password reset not implemented yet.')
              }
            >
              Forgot Password?
            </div>
          </div>

          <button
            type="submit"
            className={styles.button}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          <p className={styles.signupText}>
            Don't have an account?{' '}
            <span
              role="button"
              tabIndex={0}
              onClick={handleSwitchToSignup}
              onKeyDown={(e) =>
                (e.key === 'Enter' || e.key === ' ') && handleSwitchToSignup()
              }
              className={styles.signupLink}
            >
              Sign up
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginForm;

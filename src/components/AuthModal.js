import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { UserContext } from '../utils/UserContext';

const CloseIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path d='M6.2 6.1c3.9 3.8 7.7 7.8 11.6 11.7' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
    <path d='M17.9 6.2c-3.8 3.9-7.8 7.7-11.7 11.6' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
  </svg>
);

const AuthModal = ({ open, onClose, initialMode = 'signin', onMergePrompt }) => {
  const { signUp, signIn, resetPassword, isSupabaseConfigured } = useContext(AuthContext);
  const { completedClues } = useContext(UserContext);
  const [mode, setMode] = useState(initialMode); // 'signin', 'signup', 'reset', 'confirm', 'reset-sent'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens/closes or mode changes
  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError('');
    }
  }, [open, initialMode]);

  // Prevent background scrolling
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  if (!isSupabaseConfigured) {
    return (
      <div className='modal-overlay' onClick={onClose}>
        <div
          className='modal-content auth-modal bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className='modal-close text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
            onClick={onClose}
            aria-label='Close'
          >
            <CloseIcon />
          </button>
          <div className='auth-modal-body'>
            <h2 className='auth-title'>Authentication Not Available</h2>
            <p className='text-neutral-600 dark:text-neutral-300 text-center'>
              Authentication is not configured for this site. Your progress is saved locally on this device.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    const { error: signInError } = await signIn(email, password);
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    // Check if user has local data that needs merging
    if (completedClues?.length > 0 && onMergePrompt) {
      onMergePrompt();
    }

    onClose();
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const { error: signUpError, data } = await signUp(email, password);
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // Check if email confirmation is required
    if (data?.user?.identities?.length === 0) {
      setError('An account with this email already exists');
      return;
    }

    // Show confirmation message
    setMode('confirm');
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    const { error: resetError } = await resetPassword(email);
    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setMode('reset-sent');
  };

  const renderSignInForm = () => (
    <>
      <h2 className='auth-title'>Sign In</h2>
      <p className='auth-subtitle'>Sign in to sync your progress across devices</p>
      <form onSubmit={handleSignIn} className='auth-form'>
        <div className='auth-field'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='you@example.com'
            autoComplete='email'
            disabled={loading}
          />
        </div>
        <div className='auth-field'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Your password'
            autoComplete='current-password'
            disabled={loading}
          />
        </div>
        {error && <div className='auth-error'>{error}</div>}
        <button type='submit' className='auth-submit' disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <div className='auth-links'>
        <button
          type='button'
          className='auth-link'
          onClick={() => { setMode('reset'); setError(''); }}
        >
          Forgot password?
        </button>
        <span className='auth-divider'>|</span>
        <button
          type='button'
          className='auth-link'
          onClick={() => { setMode('signup'); setError(''); }}
        >
          Create account
        </button>
      </div>
    </>
  );

  const renderSignUpForm = () => (
    <>
      <h2 className='auth-title'>Create Account</h2>
      <p className='auth-subtitle'>Sync your progress across all your devices</p>
      <form onSubmit={handleSignUp} className='auth-form'>
        <div className='auth-field'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='you@example.com'
            autoComplete='email'
            disabled={loading}
          />
        </div>
        <div className='auth-field'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='At least 6 characters'
            autoComplete='new-password'
            disabled={loading}
          />
        </div>
        <div className='auth-field'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            id='confirmPassword'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm your password'
            autoComplete='new-password'
            disabled={loading}
          />
        </div>
        {error && <div className='auth-error'>{error}</div>}
        <button type='submit' className='auth-submit' disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <div className='auth-links'>
        <span className='auth-text'>Already have an account?</span>
        <button
          type='button'
          className='auth-link'
          onClick={() => { setMode('signin'); setError(''); }}
        >
          Sign in
        </button>
      </div>
    </>
  );

  const renderResetForm = () => (
    <>
      <h2 className='auth-title'>Reset Password</h2>
      <p className='auth-subtitle'>Enter your email and we'll send you a reset link</p>
      <form onSubmit={handleResetPassword} className='auth-form'>
        <div className='auth-field'>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='you@example.com'
            autoComplete='email'
            disabled={loading}
          />
        </div>
        {error && <div className='auth-error'>{error}</div>}
        <button type='submit' className='auth-submit' disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      <div className='auth-links'>
        <button
          type='button'
          className='auth-link'
          onClick={() => { setMode('signin'); setError(''); }}
        >
          Back to sign in
        </button>
      </div>
    </>
  );

  const renderConfirmation = () => (
    <>
      <h2 className='auth-title'>Check Your Email</h2>
      <div className='auth-message'>
        <p>We've sent a confirmation link to:</p>
        <p className='auth-email'>{email}</p>
        <p>Click the link in the email to complete your registration.</p>
      </div>
      <button
        type='button'
        className='auth-submit'
        onClick={onClose}
      >
        Done
      </button>
    </>
  );

  const renderResetSent = () => (
    <>
      <h2 className='auth-title'>Check Your Email</h2>
      <div className='auth-message'>
        <p>We've sent a password reset link to:</p>
        <p className='auth-email'>{email}</p>
        <p>Click the link in the email to reset your password.</p>
      </div>
      <button
        type='button'
        className='auth-submit'
        onClick={onClose}
      >
        Done
      </button>
    </>
  );

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div
        className='modal-content auth-modal bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='modal-close text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
          onClick={onClose}
          aria-label='Close'
        >
          <CloseIcon />
        </button>
        <div className='auth-modal-body'>
          {mode === 'signin' && renderSignInForm()}
          {mode === 'signup' && renderSignUpForm()}
          {mode === 'reset' && renderResetForm()}
          {mode === 'confirm' && renderConfirmation()}
          {mode === 'reset-sent' && renderResetSent()}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

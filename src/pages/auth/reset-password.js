import React, { useEffect, useState, useContext } from 'react';
import { navigate } from 'gatsby';
import { AuthContext } from '../../utils/AuthContext';
import { isSupabaseConfigured } from '../../utils/supabase';

const ResetPasswordPage = () => {
  const { updatePassword, isAuthenticated } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const { error: updateError } = await updatePassword(password);
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (!isAuthenticated) {
    return (
      <div className='auth-callback-container'>
        <div className='auth-callback-content'>
          <h1>Reset Link Expired</h1>
          <p>This password reset link has expired or is invalid.</p>
          <button onClick={() => navigate('/')}>Return Home</button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className='auth-callback-container'>
        <div className='auth-callback-content'>
          <h1>Password Updated</h1>
          <p>Your password has been successfully updated. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='auth-callback-container'>
      <div className='auth-callback-content reset-password-form'>
        <h1>Set New Password</h1>
        <form onSubmit={handleSubmit}>
          <div className='auth-field'>
            <label htmlFor='password'>New Password</label>
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
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

export const Head = () => <title>Reset Password - Learn Cryptic</title>;

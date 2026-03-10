import React, { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { supabase, isSupabaseConfigured } from '../../utils/supabase';

const AuthCallbackPage = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      if (!isSupabaseConfigured()) {
        navigate('/');
        return;
      }

      // Supabase handles the OAuth/email callback automatically
      // The session is set by the auth state listener in AuthContext
      // We just need to wait a moment and redirect

      try {
        // Check for error in URL
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const errorDescription = params.get('error_description');
          if (errorDescription) {
            setError(errorDescription);
            return;
          }

          // Also check hash params (some OAuth flows use hash)
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const hashError = hashParams.get('error_description');
          if (hashError) {
            setError(hashError);
            return;
          }
        }

        // Wait for auth state to update
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          setError(sessionError.message);
          return;
        }

        if (session) {
          // Successfully authenticated
          navigate('/');
        } else {
          // No session yet, wait a bit and try again
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    handleCallback();
  }, []);

  if (error) {
    return (
      <div className='auth-callback-container'>
        <div className='auth-callback-content'>
          <h1>Authentication Error</h1>
          <p>{error}</p>
          <button onClick={() => navigate('/')}>Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className='auth-callback-container'>
      <div className='auth-callback-content'>
        <h1>Confirming your account...</h1>
        <p>Please wait while we verify your email.</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;

export const Head = () => <title>Confirming Account - Learn Cryptic</title>;

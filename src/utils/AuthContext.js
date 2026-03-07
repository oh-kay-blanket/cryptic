import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';

export const AuthContext = createContext({
  user: null,
  session: null,
  loading: true,
  isAuthenticated: false,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  resetPassword: async () => {},
  updatePassword: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    // Get initial session
    const initAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);

        // Handle specific events
        if (event === 'SIGNED_IN') {
          console.log('User signed in');
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed');
        } else if (event === 'PASSWORD_RECOVERY') {
          console.log('Password recovery initiated');
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Sign up with email and password
  const signUp = useCallback(async (email, password) => {
    if (!isSupabaseConfigured()) {
      return { error: { message: 'Authentication is not configured' } };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: typeof window !== 'undefined'
            ? `${window.location.origin}/auth/callback`
            : undefined,
        },
      });

      if (error) {
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      return { error: { message: error.message } };
    }
  }, []);

  // Sign in with email and password
  const signIn = useCallback(async (email, password) => {
    if (!isSupabaseConfigured()) {
      return { error: { message: 'Authentication is not configured' } };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      return { error: { message: error.message } };
    }
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      return { error: { message: 'Authentication is not configured' } };
    }

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error };
      }
      return { error: null };
    } catch (error) {
      return { error: { message: error.message } };
    }
  }, []);

  // Reset password (sends email)
  const resetPassword = useCallback(async (email) => {
    if (!isSupabaseConfigured()) {
      return { error: { message: 'Authentication is not configured' } };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: typeof window !== 'undefined'
          ? `${window.location.origin}/auth/reset-password`
          : undefined,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error: { message: error.message } };
    }
  }, []);

  // Update password (after reset)
  const updatePassword = useCallback(async (newPassword) => {
    if (!isSupabaseConfigured()) {
      return { error: { message: 'Authentication is not configured' } };
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error: { message: error.message } };
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      session,
      loading,
      isAuthenticated: !!user,
      isSupabaseConfigured: isSupabaseConfigured(),
      signUp,
      signIn,
      signOut,
      resetPassword,
      updatePassword,
    }),
    [user, session, loading, signUp, signIn, signOut, resetPassword, updatePassword]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

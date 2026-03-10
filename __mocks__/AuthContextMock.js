// Mock for src/utils/AuthContext.js
import React, { createContext, useMemo } from 'react';

export const AuthContext = createContext({
  user: null,
  session: null,
  loading: false,
  isAuthenticated: false,
  isSupabaseConfigured: false,
  signUp: async () => ({ error: null }),
  signIn: async () => ({ error: null }),
  signOut: async () => ({ error: null }),
  resetPassword: async () => ({ error: null }),
  updatePassword: async () => ({ error: null }),
});

export const AuthProvider = ({ children }) => {
  const contextValue = useMemo(() => ({
    user: null,
    session: null,
    loading: false,
    isAuthenticated: false,
    isSupabaseConfigured: false,
    signUp: async () => ({ error: null }),
    signIn: async () => ({ error: null }),
    signOut: async () => ({ error: null }),
    resetPassword: async () => ({ error: null }),
    updatePassword: async () => ({ error: null }),
  }), []);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

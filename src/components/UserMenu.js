import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { isOnline } from '../utils/offlineQueue';

const UserMenu = () => {
  const { user, signOut, loading } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [online, setOnline] = useState(true);
  const menuRef = useRef(null);

  // Track online status
  useEffect(() => {
    setOnline(isOnline());

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    if (typeof window !== 'undefined') {
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  if (loading || !user) {
    return null;
  }

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    setIsOpen(false);
    setSigningOut(false);
  };

  // Get user's email initial for avatar
  const getInitial = () => {
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return '?';
  };

  return (
    <div className='user-menu' ref={menuRef}>
      <button
        className='user-menu-button'
        onClick={() => setIsOpen(!isOpen)}
        aria-label='User menu'
        aria-expanded={isOpen}
        aria-haspopup='true'
      >
        {getInitial()}
      </button>

      {isOpen && (
        <div className='user-menu-dropdown' role='menu'>
          <div className='user-menu-header'>
            <div className='user-menu-email'>{user.email}</div>
            <div className='user-menu-label'>Signed in</div>
          </div>
          <button
            className='user-menu-item'
            onClick={handleSignOut}
            disabled={signingOut}
            role='menuitem'
          >
            {signingOut ? 'Signing out...' : 'Sign out'}
          </button>
          <div className='user-menu-sync-status'>
            <span className={`sync-indicator ${online ? '' : 'offline'}`} />
            <span>{online ? 'Synced' : 'Offline - changes will sync when online'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

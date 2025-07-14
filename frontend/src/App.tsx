import React, { useState, useEffect } from 'react';
import AuroraBackground from './components/AuroraBackground';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import UserProfile from './components/UserProfile';
import Spinner from './components/Spinner';
import { UserProfileData, OAuthProvider } from './types';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

const App: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/auth/me`, { 
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (res.ok) {
        const userData: UserProfileData = await res.json();
        setUser(userData);
      } else if (res.status === 401) {
        setUser(null);
      } else {
        throw new Error('Failed to check authentication status');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setError('Could not connect to the server. Please make sure it is running.');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError(null);
  };

  const handleLogout = () => {
    window.location.href = `${BACKEND_URL}/auth/logout`;
  };
  
  const handleOAuthLogin = (provider: OAuthProvider) => {
    window.location.href = `${BACKEND_URL}/auth/${provider}`;
  };
  
  const handleFormAuth = async (email: string, password?: string) => {
    setError('Email & Password authentication is not implemented in this demo. Please use one of the social login options.');
  };

  const renderContent = () => {
    if (isLoading) {
      return <Spinner />;
    }
    
    if (user) {
      return <UserProfile user={user} onLogout={handleLogout} />;
    }
    
    return (
      <div className="w-full max-w-md">
        {error && (
          <div className="mb-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}
        {isLoginView ? (
          <LoginForm 
            onToggleView={toggleView} 
            onOAuthLogin={handleOAuthLogin} 
            onLogin={handleFormAuth} 
          />
        ) : (
          <SignUpForm 
            onToggleView={toggleView} 
            onOAuthLogin={handleOAuthLogin} 
            onSignUp={handleFormAuth} 
          />
        )}
      </div>
    );
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden p-4">
      <AuroraBackground />
      {renderContent()}
    </main>
  );
};

export default App;
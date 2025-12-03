import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'artist' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: 'client' | 'artist' | 'admin', name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check local storage on mount (Mock persistence)
  useEffect(() => {
    const storedUser = localStorage.getItem('vod_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, role: 'client' | 'artist' | 'admin', name?: string) => {
    // Mock user data generation
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || email.split('@')[0], // Use provided name or fallback to email part
      email,
      role,
    };
    setUser(mockUser);
    localStorage.setItem('vod_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vod_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
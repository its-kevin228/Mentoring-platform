"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'MENTOR' | 'MENTORE';
    isVerified: boolean;
    avatarUrl: string | null;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    login: (user: User, token: string, refreshToken: string) => void;
    updateUser: (userData: Partial<User>) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setRefreshToken(storedRefreshToken);
        }
        setIsLoading(false);
    }, []);

    const login = (userData: User, userToken: string, userRefreshToken: string) => {
        setUser(userData);
        setToken(userToken);
        setRefreshToken(userRefreshToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userToken);
        localStorage.setItem('refreshToken', userRefreshToken);
    };

    const updateUser = (userData: Partial<User>) => {
        if (!user) return;
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setRefreshToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, token, refreshToken, login, updateUser, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

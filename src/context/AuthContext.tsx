import React, { createContext, useContext, useEffect, useState } from 'react';
import { account } from '../lib/appwrite';
import { Models } from 'appwrite';

export interface AuthContextType {
    user: Models.User<Models.Preferences> | null;
    loading: boolean;
    isGuest: boolean;
    checkAuth: () => Promise<void>;
    loginAsGuest: () => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [loading, setLoading] = useState(true);
    const [isGuest, setIsGuest] = useState(() => {
        return localStorage.getItem('nexus-strat-guest') === 'true';
    });

    const checkAuth = async () => {
        try {
            console.log('Checking auth...');
            // Timeout after 3 seconds to prevent infinite loading
            const sessionPromise = account.get();
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Auth timeout')), 3000)
            );

            const current = await Promise.race([sessionPromise, timeoutPromise]);
            console.log('Auth success:', current);
            setUser(current as Models.User<Models.Preferences>);
        } catch (error) {
            console.log('Auth check failed or timed out:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const loginAsGuest = () => {
        setIsGuest(true);
        localStorage.setItem('nexus-strat-guest', 'true');
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
        } catch (e) {
            // Ignore if no session
        }
        setUser(null);
        setIsGuest(false);
        localStorage.removeItem('nexus-strat-guest');
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, isGuest, checkAuth, loginAsGuest, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};

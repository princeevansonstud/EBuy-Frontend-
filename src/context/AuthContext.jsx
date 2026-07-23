import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem('access') ||
        localStorage.getItem('accessToken') ||
        localStorage.getItem('access_token')
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for stored session on initial load across all alias keys
        const storedToken =
            localStorage.getItem('access') ||
            localStorage.getItem('accessToken') ||
            localStorage.getItem('access_token');
        const storedUser = localStorage.getItem('user') || localStorage.getItem('username');

        if (storedToken) {
            setToken(storedToken);
        }
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                setUser({ username: storedUser });
            }
        }
        setLoading(false);
    }, []);

    const login = (userData, accessToken, refreshToken) => {
        // Save to all common key variants to prevent mismatch issues
        if (accessToken) {
            localStorage.setItem('access', accessToken);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('access_token', accessToken);
        }
        if (refreshToken) {
            localStorage.setItem('refresh', refreshToken);
            localStorage.setItem('refresh_token', refreshToken);
        }
        if (userData) {
            localStorage.setItem('user', JSON.stringify(userData));
            if (userData.username) {
                localStorage.setItem('username', userData.username);
            }
            if (userData.role) {
                localStorage.setItem('user_role', userData.role);
            }
        }
        setToken(accessToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading, isAuthenticated: !!token }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
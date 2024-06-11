import React, { createContext, useState, useEffect } from 'react';

// Create the Auth Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        if (token) {
            setIsAuth(true);
        }
        if (user) {
            setUser(user);
        }
    }, []);

    const login = (data) => {
        setIsAuth(false);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsAuth(true);
        setUser(data.user)
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuth, login, logout, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

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
        setIsAuth(true);
        updateUserDetails(data.user)
        // navigate("/");
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuth(false);
        setUser(null);

    };

    const updateUserDetails = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user)
    }

    return (
        <AuthContext.Provider value={{ isAuth, login, logout, updateUserDetails, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

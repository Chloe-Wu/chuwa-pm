import React, { createContext, useContext, useState } from 'react';

// Create a context for user authentication
export const AuthContext = createContext();

// Create a provider component to wrap your app and manage user state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to sign out the user
    const signOut = () => {
        // Clear user data (you may need to clear cookies or tokens as well)
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a custom hook to access the user and signOut function
export const useAuth = () => {
    return useContext(AuthContext);
};

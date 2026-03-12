import { createContext, useState } from "react";

export const AuthContext = createContext({
  loggedInUsername: null,
  loggedInRole: null,
  isAdmin: () => {},
  isLoggedIn: () => {},
  login: () => {},
  logout: () => {},
});

export function AuthContextProvider({ children }) {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const login = (userData) => setLoggedInUser(userData);
    const logout = () => setLoggedInUser(null);

    const isAdmin = () => loggedInUser?.roles?.includes('ADMIN');
    const isLoggedIn = () => loggedInUser !== null;

    const authContext = {
        loggedInUsername: loggedInUser?.username,
        loggedInRole: loggedInUser?.roles[0],
        isAdmin: isAdmin,
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
  };
    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
}
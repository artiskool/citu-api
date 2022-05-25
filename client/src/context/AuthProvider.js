import { createContext, useState } from "react";

const AuthContext = createContext({});

const DEFAULT_LOCAL_STORAGE_KEY = 'rjs_app';
const stringify = (data) => {
    if (typeof data !== 'string') {
        try {
            const json = JSON.stringify(data);
            data = json;
        }
        catch (err) {}
    }
    return data;
}
const parse = (data) => {
    if (typeof data === 'string') {
        try {
            const json = JSON.parse(data);
            data = json;
        }
        catch (err) {}
    }
    return data;
}
const setLocalStorage = (data, key = null) => {
    if (!key) {
        key = DEFAULT_LOCAL_STORAGE_KEY;
    }
    key = stringify(key);
    data = stringify(data);
    localStorage.setItem(key, data);
}
const getLocalStorage = (key = null) => {
    if (!key) {
        key = DEFAULT_LOCAL_STORAGE_KEY;
    }
    let data = localStorage.getItem(key);
    if (data) {
        data = parse(data);
    }
    return data;
}
export const AuthProvider = ({ children }) => {
    const data = getLocalStorage();
    const [auth, setAuth] = useState(data?data:{});
    const keepLogin = (data) => {
        setLocalStorage(data);
    }
    return (
        <AuthContext.Provider value={{ auth, setAuth, keepLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
// return the user data from the session storage
import axios from "axios";

const transport = axios.create({withCredentials: true});
const SERVER = process.env.REACT_APP_API_URL;

export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return userStr;
    else return null;
}

// return the token from the session storage
export const isLogin = () => {
    return sessionStorage.getItem('user') || null;
}

// remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('user');
}

export async function verifySession() {
    return await transport.post(SERVER + '/verify')
        .then(response => {
            return response
        })
        .catch(error => {
            transport.post(SERVER + '/logout')
            console.log(error)
            console.log('removed')
            removeUserSession();
            return error;
        })
}

// set the token and user from the session storage
export const setUserSession = (session) => {
    console.log(session.username);
    sessionStorage.setItem('user', String(session.username));
}

// return the user data from the session storage
import axios from "axios";
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

export const verifySession = async () => {
    const verification = async () => {
        const transport = axios.create({withCredentials: true});
        transport.post(SERVER + '/verify')
            .then(response => {
                setUserSession(response);
                return true;
            })
            .catch(error => {
                console.log(error)
                console.log('removed')
                removeUserSession();
                return false;
                // return <Redirect to={'/login'} />
            });
    }

}
// set the token and user from the session storage
export const setUserSession = (session) => {
    console.log(session.username);
    sessionStorage.setItem('user', String(session.username));
}

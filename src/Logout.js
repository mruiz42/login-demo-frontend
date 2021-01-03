import {React, useState, setState} from 'react';
import { getUser, removeUserSession } from './Utils/Common';

function Logout(props) {
    const user = getUser();

    // handle click event of logout button
    const handleLogout = () => {
        removeUserSession();
        props.history.push('/login');
    }

    return (
        <div>
            Welcome {user.name}!<br /><br />
            <input type="button" onClick={handleLogout} value="Logout" />
        </div>
    );
}

export default Logout;

import React from 'react';
import {getUser, removeUserSession, setUserSession, verifySession} from './Utils/Common';
import axios from "axios";

const SERVER = process.env.REACT_APP_API_URL;

function Dashboard(props) {
    let user = getUser();


  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
      const transport = axios.create({withCredentials: true});
      transport.post(SERVER + '/logout')
          .then(response => {
              sessionStorage.removeItem('user')
              console.log(response);
              props.history.push('/login');
          })
          .catch(error => {
              console.log(error);
          });

  }

  return (
    <div>
      Welcome {user}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;

import React from 'react';
import {getUser, removeUserSession, setUserSession} from './Utils/Common';
import axios from "axios";

const SERVER = process.env.REACT_APP_API_URL;

function Dashboard(props) {
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
      const transport = axios.create({withCredentials: true});
      transport.post(SERVER + '/logout')
          .then(response => {
              console.log(response)
              props.history.push('/login');
          })
          .catch(error => {
              console.log(error)
          });

  }

  return (
    <div>
      {/*Welcome {user.name}!<br /><br />*/}
      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;

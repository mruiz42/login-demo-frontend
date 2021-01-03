import React, { useState, setState } from 'react';
import axios from 'axios';
import {setUserSession, verifySession} from "./Utils/Common";
// import { setUserSession } from './Utils/Common';

const SERVER = process.env.REACT_APP_API_URL;

function Login(props) {
    const [loading, setLoading] = useState(false);
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
      setError(null);
      setLoading(true);
      axios.post(SERVER + '/login', { email: email.value, password: password.value }, {withCredentials: true})
          .then(res => {
              verifySession()
                  .then(r => {
                      setLoading(false);
                      const session = res.data
                      setUserSession(session);
                      props.history.push('/dashboard')
                })
    })
        .catch(e => {
            setLoading(false);
            // TODO bandaid fix before &&
            if (e.response.status === 401) {
                setError(e.response.data.message);
            }
            else {
                return false;
                // setError(e.response.data.message);
            }
    });
  }

  return (
    <div>
      Login<br /><br />
      <div>
        E-mail<br />
        <input type="text" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;

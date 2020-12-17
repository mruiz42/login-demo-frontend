import React, { useState } from 'react';
import axios from 'axios';

function Register(props) {
    const [loading, setLoading] = useState(false);
    const email = useFormInput('');
    const name = useFormInput('');
    const username = useFormInput('');
    const password = useFormInput('');
    const confirm_password = useFormInput('')
    const [error, setError] = useState(null);

    // handle button click of register form
    const handleSubmit = () => {
        setError(null);
        setLoading(true);

        axios.post('http://192.168.0.100:4000/register', {
            username: username.value, 
            name: name.value, 
            email: email.value,
            password: password.value 
        })
            .then(response => { setLoading(false);
                console.log("logged");
                props.history.push('/dashboard');
            })
            .catch(error => {
                setLoading(false);
                // if (error.response.status === 401) setError(error.response.data.message);
                // else
                setError("Something went wrong. Please try again later.");
            });
    }

    return (
        <div>
            Register<br /><br />
            <div>
                Username<br />
                <input type="text" {...username} autoComplete="new-password" />
            </div>
            <div>
                E-mail<br />
                <input type="email" {...email} />
            </div>
            <div>
                Name<br />
                <input type="text" {...name} />
            </div>
            <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" {...password} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Confirm password<br />
                <input type="password" {...confirm_password} autoComplete="new-password" />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Register'} onClick={handleSubmit} disabled={loading} /><br />
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

export default Register;

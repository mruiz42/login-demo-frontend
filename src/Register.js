import React, { useState } from 'react';
import axios from 'axios';

const SERVER = process.env.REACT_APP_API_URL;
console.log(SERVER)
console.log(process.env)

function Register(props) {
    const [loading, setLoading] = useState(false);
    const email_form = useFormInput('');
    const name_form = useFormInput('');
    const username_form = useFormInput('');
    const password_form = useFormInput('');
    const confirm_password_form = useFormInput('')
    const [error, setError] = useState(null);

    const validEmail = (emailAddr) => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailAddr))
        {
            return true;
        }
        else {
            return false;
        }
    }

    const validUsername = (username) => {
        // TODO
        return true
    }

    const validName = (name) => {
        // TODO
        return true
    }
    // handle button click of register form
    const handleSubmit = () => {
        setError(null);
        setLoading(true);
        const email = email_form.value;
        const username = username_form.value;
        const name = name_form.value;
        const password = password_form.value;
        const confirm_password = confirm_password_form.value;

        // TODO: Check if user is entering appropriate values for Username an Email and Password
        // check if all fields are inputted
        if (email === ''  || username === ''  || name === ''  || password === '' || confirm_password === '') {
            setLoading(false);
            setError("Some required fields are empty.");
        }
        else if (!validEmail(email)) {
            setLoading(false);
            setError("Email address invalid format.");

        }
        else if (!validUsername(username)) {
            setLoading(false);
            setError("Username invalid format.");
        }
        else if (!validName) {
            setLoading(false);
            setError("Name invalid format.");
        }
        else if (password !== confirm_password) {
            setLoading(false);
            setError("Passwords do not match. Please try again.")
        }
        else {
            axios.post(SERVER + '/register', {
                username: username,
                name: name,
                email: email,
                password: password
            })
                .then(response => {
                    setLoading(false);
                    console.log("logged");
                    props.history.push('/dashboard');
                })
                .catch(error => {
                    setLoading(false);
                    if (error.response.status === 401) {
                        setError(error.response.data.message);
                    }
                    else{
                        setError("Something went wrong. Please try again later.");
                    }
                });
        }
    }

    return (
        <div>
            Register<br /><br />
            <div>
                Username*<br />
                <input type="text" {...username_form} autoComplete="new-password" />
            </div>
            <div>
                E-mail*<br />
                <input type="email" {...email_form} />
            </div>
            <div>
                Name*<br />
                <input type="text" {...name_form} />
            </div>
            <div style={{ marginTop: 10 }}>
                Password*<br />
                <input type="password" {...password_form} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Confirm password*<br />
                <input type="password" {...confirm_password_form} autoComplete="new-password" />
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

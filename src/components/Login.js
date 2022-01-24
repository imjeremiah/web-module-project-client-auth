import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const initialState = {
        username: "",
        password: ""
    };
    const [ state, setState ] = useState(initialState);
    const { push } = useHistory();
    const onChange = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    };
    const onSubmit = e => {
        e.preventDefault();
        axios
            .post('http://localhost:9000/api/login', state)
            .then(res => {
                console.log(res)
                localStorage.setItem("token", res.data.token);
                push('/friends');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <label name='username'>
                    Username:
                    <input
                        name='username'
                        type='text'
                        value={state.username}
                        onChange={onChange} />
                </label>
                <label name='password'>
                    Password:
                    <input 
                        name='password'
                        type='password'
                        value={state.password}
                        onChange={onChange} />
                </label>
                <button type='submit'>SUBMIT</button>
            </form>
        </div>
    )
};

export default Login;
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

const AddFriend = () => {
    const initialState = {
        name: "",
        email: ""
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
        axiosWithAuth()
            .post('http://localhost:9000/api/friends', state)
            .then(res => {
                push('/friends');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h1>Add a Friend</h1>
            <form onSubmit={onSubmit}>
                <label name='name'>
                    Name:
                    <input
                        name='name'
                        type='text'
                        value={state.name}
                        onChange={onChange} />
                </label>
                <label name='email'>
                    Email:
                    <input 
                        name='email'
                        type='email'
                        value={state.email}
                        onChange={onChange} />
                </label>
                <button type='submit'>Add Friend</button>
            </form>
        </div>
    )
};

export default AddFriend;
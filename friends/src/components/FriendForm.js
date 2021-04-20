import React, { useState } from 'react';
import { axiosWithAuth } from './../utils/axiosWithAuth';

const initialValues = {
  id: Date.now(),
    name:"",
    age:"",
    email:""
}
const FriendForm = (props) => {
    const [errorMessage, setErrorMessage] = useState("")
    const [state, setState] = useState(initialValues);
    
    const handleChange = e => {
        setState({
            ...state,
            [e.target.name]:e.target.value
        });
    };
  
    const formReset = () => {
        setState(initialValues)
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (state.name === "" || state.age === "" || state.email === "") {
          setErrorMessage("Name, age and email fields are required.");
        }
        else {
          axiosWithAuth()
            .post('/api/friends', state)
            .then(res => {
              setState(
                res.data,
                {id: Date.now()}
              )
              props.friends();
            })
            .catch(err => {
                console.log(err);
            });

          formReset();
        }
    };
    return (
        <section>
            <h2>Add Friend</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label><br/>
                    <input 
                        onChange={handleChange} 
                        value={state.name} 
                        name="name" 
                        id='name' 
                    />
                </div>
                <div>
                    <label htmlFor="age">Age:</label><br/>
                    <input 
                        onChange={handleChange} 
                        value={state.age} 
                        name="age" 
                        id="age" 
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label><br/>
                    <input 
                        onChange={handleChange} 
                        value={state.email} 
                        name="email" 
                        id="email" 
                    />
                </div>
                {
                    errorMessage && <div>Error: {errorMessage}</div>
                }
                <button>Submit</button>
            </form>
        </section>
    );
}

export default FriendForm;
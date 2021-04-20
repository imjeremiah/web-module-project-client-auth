import React, { useState } from 'react';
import { axiosWithAuth } from './../utils/axiosWithAuth';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
            <h2>Add Friend</h2><br/>
            <div className="form">
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="name">Name:</Label><br/>
                    <Input 
                        onChange={handleChange} 
                        value={state.name} 
                        name="name" 
                        id='name' 
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="age">Age:</Label><br/>
                    <Input 
                        onChange={handleChange} 
                        value={state.age} 
                        name="age" 
                        id="age" 
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email:</Label><br/>
                    <Input 
                        onChange={handleChange} 
                        value={state.email} 
                        name="email" 
                        id="email" 
                    />
                </FormGroup>
                {
                    errorMessage && <div style={{ color: "red" }}>Error: {errorMessage}</div>
                }
                <Button color="primary">Submit</Button>
            </Form>
            </div><br/><br/>
        </section>
    );
}

export default FriendForm;
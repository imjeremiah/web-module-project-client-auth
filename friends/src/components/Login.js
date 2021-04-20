import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


class Login extends React.Component {
    state = {
        credentials: {
            username: "",
            password: "",
        }
    };

    handleChange = e => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        axiosWithAuth()
            .post("/api/login", this.state.credentials)
            .then(res => {
                window.localStorage.setItem("token", res.data.payload);
                this.props.history.push("/friends-list")
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <div className="form">
            <Form className="w-25" onSubmit={this.login}>
                <FormGroup>
                    <Label>Username: </Label>
                    <Input
                         
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Password: </Label>
                    <Input 
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <Button color="info">Log In</Button>                    
            </Form>
            </div>

        );
    };
};

export default Login;
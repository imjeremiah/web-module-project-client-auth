import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
    state = {
        credentials: {
            username: "",
            password: "",
        },
        isLoading: false
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
                console.log(res);
                // res.data.payload
                window.localStorage.setItem("token", res.data.payload);
                this.props.history.push("/friends-list")
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.login}>
                    <label>Username: </label>
                    <input 
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        onChange={this.handleChange}
                    />
                    <label>Password: </label>
                    <input 
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <button>Log In</button>                    
                </form>
            </div>
        );
    };
};

export default Login;
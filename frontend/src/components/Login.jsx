import React, { Component } from 'react';
import axios from 'axios';
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {auth} from '../actions';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);

        // axios.post('http://localhost:8000/login/', { username, password })
        //     .then(res => {
        //         const data = res.data;
        //         localStorage.setItem("token", data.token);
        //     });
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <fieldset>
                        <legend>Login</legend>
                        <label htmlFor="username">Username</label>
                        {this.props.errors.length > 0 && (
                            <ul>
                                {this.props.errors.map(error => (
                                    <li key={error.field}>{error.message}</li>
                                ))}
                            </ul>
                        )}
                        <input id="username" type="text" onChange={e => this.setState({username: e.target.value})} />

                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" onChange={e => this.setState({password: e.target.value})} />

                        <button type="submit">Login</button>
                    </fieldset>
                </form>
                <button onClick={e => console.log(localStorage.getItem("token"))} >Get localStorage</button>
            </div>
        )
    }

}

const mapStateToProps = state => {
    let errors = [];
    if (state.auth.errors) {
        errors = Object.keys(state.auth.errors).map(field => {
            return {field, message: state.auth.errors[field]};
        });
    }
    return {
        errors,
        isAuthenticated: state.auth.isAuthenticated
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => {
            return dispatch(auth.login(username, password));
        }
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);
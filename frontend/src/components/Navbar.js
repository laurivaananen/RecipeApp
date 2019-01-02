import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './Navbar.css';

class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            showDropdown: false,
            user: {},
        }

        this.showDropdown = this.showDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    }

    showDropdown(event) {
        event.preventDefault();

        this.setState({ showDropdown: true }, () => {
                document.addEventListener('click', this.closeDropdown);
          });
    }

    closeDropdown(event) {
        if (!this.dropdownContent.contains(event.target)) {
            this.setState({ showDropdown: false }, () => {
                document.removeEventListener('click', this.closeDropdown);
            });
        }
    }

    userData() {
        const userToken = localStorage.getItem("token");
        const authorizationToken = "Token " + userToken;

        if (userToken) {
            axios.get(`http://localhost:8000/user/`, {headers: {"authorization": authorizationToken}})
                .then(res => {
                    const data = res.data;
                    this.setState({
                        user: data,
                    });
                });
        }
    }

    componentDidMount() {
        // this.userData();
    }


    render() {
        return (
            <nav>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div className="dropdown">
                    <a href="#" onClick={this.showDropdown} >Menu</a>
                    {this.state.showDropdown ?
                    <div className="dropdown-content"
                        ref={(element) => {
                            this.dropdownContent = element;
                        }}>
                        <Link to="/recipes/">List</Link>
                        <Link to="/add/">Add</Link>
                        <Link to="/login/">Login</Link>
                    </div>
                    : null}
                </div>
                <div>
                    {this.state.user.username ? <Link to="/user/">{this.state.user.username}</Link> : null}
                </div>
            </nav>
        );
    }
}

export default Navbar;
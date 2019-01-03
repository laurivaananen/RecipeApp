import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {auth} from "../actions";
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


    render() {
        return (
            <nav>
                <div className="nav-item-container" >
                    <i onClick={this.showDropdown} className="fas fa-bars"></i>
                    {this.state.showDropdown ?
                        <div className="dropdown-content"
                            ref={(element) => {
                                this.dropdownContent = element;
                            }}>
                            <Link to="/add/">Add</Link>
                            <Link to="/register/">Register</Link>
                        </div>
                    : null}
                    <Link to="/">Home</Link>
                    {this.props.user ? <a onClick={this.props.logout}>Logout</a> : <Link to="/login/">Login</Link>}
                </div>
            </nav>
            // <nav>
            //     <div>
            //         <i class="fas fa-bars"></i>
            //     </div>
            //     <div>
            //         <Link to="/">Home</Link>
            //     </div>
            //     <div className="dropdown">
            //         <a href="#" onClick={this.showDropdown} >Menu</a>
            //         {this.state.showDropdown ?
            //         <div className="dropdown-content"
            //             ref={(element) => {
            //                 this.dropdownContent = element;
            //             }}>
            //             <Link to="/recipes/">List</Link>
            //             <Link to="/add/">Add</Link>
            //             <Link to="/login/">Login</Link>
            //             <Link to="/register/">Register</Link>
            //         </div>
            //         : null}
            //     </div>
            //     <div>
            //         {this.props.user && (<a onClick={this.props.logout}>{this.props.user.username}</a>)}
            //     </div>
            // </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
      user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(auth.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
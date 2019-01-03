import React, { Component } from 'react';
import './Header.css';
import Navbar from './Navbar';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
            <Navbar />
            <header>
                <h1>Delicious Recipes</h1>
                <h3>The Best Recipes from Asia</h3>
            </header>
            </React.Fragment>
        );
    }
}

export default Header;
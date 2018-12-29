import React, { Component } from 'react';
import './Header.css';
import Navbar from './Navbar';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header>
                <Navbar />
                <h1>Delicious Recipes</h1>
                <h3>The Best Recipes from Asia</h3>
            </header>
        );
    }
}

export default Header;
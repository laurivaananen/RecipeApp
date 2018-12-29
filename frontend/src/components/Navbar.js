import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
    constructor() {
        super();

        this.state = {
            showDropdown: false,
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


    render() {
        return (
            <nav>
                <div>
                    <a href="#">Home</a>
                </div>
                <div className="dropdown">
                    <a href="#" onClick={this.showDropdown} >Menu</a>
                    {this.state.showDropdown ?
                    <div className="dropdown-content"
                        ref={(element) => {
                            this.dropdownContent = element;
                        }}>
                        <a href="#">List</a>
                        <a href="#">New</a>
                        <a href="#">Login</a>
                        <a href="#">Login</a>
                        <a href="#">Login</a>
                    </div>
                    : null}
                </div>
            </nav>
        );
    }
}

export default Navbar;
import React, { Component } from 'react';
import './App.css';
import List from './components/List';
import AddForm from './components/AddForm';
import Header from './components/Header';

class App extends Component {

    render() {
        return (
            <React.Fragment>
                <Header />
                {/* <AddForm /> */}
                <List/>
            </React.Fragment>
        );
    }
}

export default App;

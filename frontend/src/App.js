import React, { Component } from 'react';
import List from './components/List';
import AddForm from './components/AddForm';
import './App.css';

class App extends Component {

    render() {
        return (
            <main>
                <AddForm />
                <List/>
            </main>
            
        );
    }
}

export default App;

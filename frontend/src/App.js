import React, { Component } from 'react';
import List from './components/List';
import AddForm from './components/AddForm';

class App extends Component {
    render() {
        return (
            <div >
                <div >
                    
                    <AddForm />
                    <List/>
                </div>
            </div>
        );
    }
}

export default App;

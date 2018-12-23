import React, { Component } from 'react';
import axios from 'axios';
import Recipe from './Recipe';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/recipes/`)
            .then(res => {
                const list = res.data;
                this.setState({
                    recipes: list
                });
            })
    }

    render() {
        return (
            <div className="List">
                <ul>
                    {this.state.recipes.map(recipe =>
                        <Recipe key={ recipe.id } data={recipe} />
                    )}
                </ul>
            </div>
        );
    }
}

export default List;
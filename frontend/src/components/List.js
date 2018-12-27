import React, { Component } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import './List.css';

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
            <div className="recipe-list">
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
import React, { Component } from 'react';
import './Recipe.css';

class Recipe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    handleToggle(e) {
        e.preventDefault();
        this.setState({
            expanded: !this.state.expanded
        });
    };


    render() {
        const { id, title, description, category, ingredients } = this.props.data;
        const { expanded } = this.state;
        return(
            <li key={ id } className={`recipe ${expanded ? 'is-expanded' : ''}`} onClick={(e) => this.handleToggle(e)} >
                <p>{ title }</p>
                <p>{ category }</p>
                <div className="body">
                    <p className="body">{ description }</p>
                    <div className="ingredients">
                        <p>Ingredients:</p>
                        <ul>
                            { ingredients.map(x => 
                                <li key={ x.id }>{ x.name }</li>
                            )}
                        </ul>
                    </div>

                </div>
            </li>
        );
    };
}


export default Recipe;

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
            <li key={ id } className={`recipe-item ${expanded ? 'is-expanded' : ''}`}>
                <div className='recipe-header' onClick={(e) => this.handleToggle(e)} >
                    <p className='recipe-title' >{ title }</p>
                    <p className='recipe-category' >{ category }</p>
                </div>
                
                <div className="body">
                    <div>
                    <p className="recipe-description">{ description }</p>
                    <div className="ingredients">
                        <p>Ingredients:</p>
                        <ul>
                            { ingredients.map(x => 
                                <li key={ x.id }>{ x.name }</li>
                            )}
                        </ul>
                    </div>
                    </div>
                    <button>Delete</button>
                </div>
            </li>
        );
    };
}


export default Recipe;

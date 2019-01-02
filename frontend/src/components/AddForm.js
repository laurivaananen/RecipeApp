import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './AddForm.css';
import {recipes} from "../actions";


class AddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            title: '',
            description: '',
            category: '',
            ingredients_write: ['']
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleIngredientNameChange = (idx) => (evt) => {
        let ingredients_write = this.state.ingredients_write;
        if ( ingredients_write.length - 1 === idx ) {
            ingredients_write = this.state.ingredients_write.concat(['']);
        }

        const newingredients_write = ingredients_write.map((ingredient, sidx) => {
            if (idx !== sidx) {
                return ingredient;
            }
            return evt.target.value;
        });
    
        this.setState({ ingredients_write: newingredients_write });
    }

    handleRemoval = (idx) => () => {
        if ( this.state.ingredients_write.length -1 !== idx ) {
            if ( this.state.ingredients_write[idx].name === '' ){
                this.setState({
                    ingredients_write: this.state.ingredients_write.filter((s, sidx) => idx !== sidx)
                });
            }
        }
    }

    handleRemoveIngredient = (idx) => () => {
        this.setState({
            ingredients_write: this.state.ingredients_write.filter((s, sidx) => idx !== sidx)
        });
    }
    
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.addRecipe(this.state);
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/categories/`)
            .then(res => {
                const categories = res.data;
                const default_category = categories[0].id
                this.setState({
                    categories: categories,
                    category: default_category
                });
            });
    }


    render() {
        return(
            <div className="recipe-form" >
                <form onSubmit={this.handleSubmit}>
                    <div className='input-row' >
                        <label htmlFor="recipe_title">Title</label>
                        <input
                            required='true'
                            minLength='2'
                            maxLength='128'
                            id="recipe_title"
                            type='text'
                            name='title'
                            value={this.state.title} onChange={this.handleChange} />
                    </div>
                    <div className='input-row' >
                        <label htmlFor="recipe_description">Description</label>
                        <textarea
                            rows={this.state.description.split("\n").length}
                            id="recipe_description"
                            type='text'
                            name='description'
                            value={this.state.description} onChange={this.handleChange} />
                    </div>
                    <div className='input-row'>
                        <label htmlFor='recipe_category' >Category</label>
                        <select id='recipe_category' name='category' value={this.state.category} onChange={this.handleChange} >
                            { this.state.categories.map( ({ name, id }) => (
                                <option key={ id } value={ id }>{ name }</option>
                            ))}
                        </select>
                    </div>
                        <div className='input-row'>
                        <label>Ingredients</label>
                        {this.state.ingredients_write.map((ingredient, idx) => (
                                <input
                                    type="text"
                                    // placeholder={`ingredient #${idx + 1} name`}
                                    value={ingredient}
                                    onBlur={this.handleRemoval(idx)}
                                    onChange={this.handleIngredientNameChange(idx)}
                                />
                            ))
                            .map((field, idx) => {
                                if (this.state.ingredients_write.length > idx + 1) {
                                    
                                    return (
                                        <div className="ingredient-field" >
                                            {field}
                                            <button type="button" onClick={this.handleRemoveIngredient(idx)} className="small">X</button>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="ingredient-field" >
                                            {field}
                                        </div>
                                    )
                                }
                            })
                            }
                            </div>
                    <div className='input-row'>
                        <input type='submit' value='submit'></input>
                    </div>
                </form>
            </div>
        );
    };
}


const mapStateToProps = state => {
    return state
}


const mapDispatchToProps = dispatch => {
    return {
        addRecipe: (state) => {
            dispatch(recipes.addRecipe(state));
        },
    }
}
  
  
export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
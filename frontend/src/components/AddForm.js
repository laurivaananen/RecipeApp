import React, { Component } from 'react';
import './Recipe.css';

class AddForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            category: '',
            ingredients: [
                {
                    name: '',
                },
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.handleIngredient = this.handleIngredient.bind(this);
        this.deleteIngredient = this.deleteIngredient.bind(this);
    }

    handleIngredientNameChange = (idx) => (evt) => {
        let ingredients = this.state.ingredients;
        if ( ingredients.length - 1 === idx ) {
            ingredients = this.state.ingredients.concat([{ name: '' }]);
        }

        const newIngredients = ingredients.map((ingredient, sidx) => {
            if (idx !== sidx) return ingredient;
            return { ...ingredient, name: evt.target.value };
        });
    
        this.setState({ ingredients: newIngredients });
    }

    // handleSubmit = (evt) => {
    //     const { name, ingredients } = this.state;
    //     alert(`Incorporated: ${name} with ${ingredients.length} ingredients`);
    // }
    
    handleAddIngredient() {
        this.setState({
            ingredients: this.state.ingredients.concat([{ name: '' }])
        });
    }

    handleRemoval = (idx) => () => {
        if ( this.state.ingredients.length -1 != idx ) {
            if ( this.state.ingredients[idx].name === '' ){
                this.setState({
                    ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
                });
            }
        }
    }

    handleRemoveIngredient = (idx) => () => {
        this.setState({
            ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
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

        const { name, description, category, ingredients } = this.state;

        console.log({ name, description, category, ingredients });

        // axios.post('/', { fname, lname, email })
        //   .then((result) => {
        //   });
    }

    handleIngredient(event) {
        if (event.key === 'Enter') {
            console.log(this.state.ingredients);
            const nextIncrement = this.state.increment + 1;
            const ingredients = this.state.ingredients.concat([{id: nextIncrement, name: ''}]);
            // ingredients[nextIncrement] = {id: nextIncrement, name: ''};
            
            this.setState({
                increment: nextIncrement,
                ingredients: ingredients
            });
            event.preventDefault();
        }
    }

    addIngredient(event) {
        const ingredients = [...this.state.ingredients];

        const obj = ingredients.pop(event.target.id);

        obj.name = event.target.value;

        ingredients.splice(event.target.id, 0, obj);

        this.setState({
            ingredients: ingredients
        });
    }

    deleteIngredient(event) {
        // console.log(Number(event.target));
        const id = Number(event.target.name);
        const ingredient = this.state.ingredients[event.target.name];
        const ingredients = [...this.state.ingredients];

        // const index = ingredients.
        const aa = ingredients.filter(x => x.id !== id);
        console.log(aa);
        this.setState({
            ingredients: aa
        });
    }


    render() {
        return(
            <div className='form'>
                <form onSubmit={this.handleSubmit}>
                    <label>Name:
                        <input type='text' name='name' value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>Description:
                        <input type='text' name='description' value={this.state.description} onChange={this.handleChange} />
                    </label>
                    <br/>
                    <label>Category:
                        <select name='category' value={this.state.category} onChange={this.handleChange} >
                            <option value='Breakfast'>Breakfast</option>
                            <option value='Lunch'>Lunch</option>
                            <option value='Dinner'>Dinner</option>
                        </select>
                    </label>
                    <br/>
                        <label htmlFor={this.state.increment}>Ingredients:</label>
                        {this.state.ingredients.map((ingredient, idx) => (
                            <div className="ingredient">
                                <input
                                    // autoFocus
                                    type="text"
                                    placeholder={`ingredient #${idx + 1} name`}
                                    value={ingredient.name}
                                    onBlur={this.handleRemoval(idx)}
                                    onChange={this.handleIngredientNameChange(idx)}
                                />
                                <button type="button" onClick={this.handleRemoveIngredient(idx)} className="small">-</button>
                            </div>
                            ))}
                            {/* <button type="button" onClick={this.handleAddIngredient} className="small">Add ingredient</button> */}
                    <br/>
                    <input type='submit' value='submit'></input>
                </form>
            </div>
        );
    };
}

export default AddForm;

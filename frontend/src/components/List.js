import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Recipe from './Recipe';
import './List.css';
import {recipes} from "../actions";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // recipes: [],
            // next: '',
            title: '',
            // categories: [],
        }
        this.loadMore = this.loadMore.bind(this);
        this.searchRecipes = this.searchRecipes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    }

    loadMore(event) {
        event.preventDefault();
        this.props.loadMoreRecipes(this.props.next);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    searchRecipes(event) {
        event.preventDefault();
        let params = {
            title: this.state.title,
            categories: this.props.categories.filter(x => x.selected).map(x => x.id),
        }
        this.props.fetchRecipes('http://localhost:8000/recipes/', params=params);
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

    selectCategory = (category_id) => () => {
        this.setState({
            categories: this.props.categories.map(x => {
                const category = x;
                if (category.id === category_id) {
                    return Object.assign(category, {selected: !category.selected})
                }
                return category;
            })
        });
    }

    componentDidMount() {
        this.props.fetchRecipes('http://localhost:8000/recipes/');
        this.props.fetchCategories();
    }

    render() {
        return (
            <section>
                <div className="recipe-search" >
                    <form>
                        <input onChange={this.handleChange} name="title" type="text"/>
                        <div className="multiselect">
                            <p onClick={this.showDropdown} >Categories({this.props.categories.filter(x => x.selected)
                                .map(x => 1)
                                .reduce((x, y) => x + y, 0)})</p>
                            {this.state.showDropdown ?
                            <ul
                                className="options"
                                ref={(element) => {
                                    this.dropdownContent = element;
                                }}
                            >
                                {this.props.categories.sort((x, y) => x.name > y.name).map(category => (
                                    <li
                                        key={category.id}
                                        onClick={this.selectCategory(category.id)}
                                        className={category.selected ? "selected" : ""} >{category.name}</li>
                                ))}
                            </ul>
                            : null}
                        </div>
                        <button onClick={this.searchRecipes}>Search</button>
                    </form>
                </div>
                <div className="recipe-list">
                    <ul>
                        {this.props.recipes.map(recipe =>
                            <Recipe key={ recipe.id } data={recipe} />
                        )}
                        {this.props.next ?
                        <button className="load-recipes" onClick={this.loadMore}>Load More</button>
                        : null}
                    </ul>
                    
                </div>
            </section>
        );
    }
}


const mapStateToProps = state => {
    return state.recipes
}


const mapDispatchToProps = dispatch => {
    return {
        addRecipe: (text) => {
            dispatch(recipes.addRecipe(text));
        },
        updateRecipe: (id, text) => {
            dispatch(recipes.addRecipe(id, text));
        },
        deleteRecipe: (id) => {
            dispatch(recipes.deleteRecipe(id));
        },
        fetchRecipes: (url, params) => {
            dispatch(recipes.fetchRecipes(url, params));
        },
        fetchCategories: () => {
            dispatch(recipes.fetchCategories());
        },
        loadMoreRecipes: (url) => {
            dispatch(recipes.loadMoreRecipes(url));
        },
    }
}
  
  
export default connect(mapStateToProps, mapDispatchToProps)(List);
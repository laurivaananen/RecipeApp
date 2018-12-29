import React, { Component } from 'react';
import axios from 'axios';
import Recipe from './Recipe';
import './List.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            next: '',
            title: '',
            categories: [],
        }
        this.loadMore = this.loadMore.bind(this);
        this.searchRecipes = this.searchRecipes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    }

    loadMore(event) {
        event.preventDefault();

        if (this.state.next) {
            axios.get(this.state.next)
                .then(res => {
                    const data = res.data;
                    const newData = [...this.state.recipes.slice(), ...data.results];
                    this.setState({
                        recipes: newData,
                        next: data.next
                    });
                });
        }
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

        axios.get('http://localhost:8000/recipes/', {
            params: {
                title: this.state.title,
                categories: this.state.categories.filter(x => x.selected).map(x => x.id),
            }
        })
            .then(res => {
                const data = res.data;
                this.setState({
                    recipes: data.results,
                    next: data.next,
                });
            })
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
            categories: this.state.categories.map(x => {
                const category = x;
                if (category.id === category_id) {
                    return Object.assign(category, {selected: !category.selected})
                }
                return category;
            })
        });
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/recipes/`)
            .then(res => {
                const data = res.data;
                this.setState({
                    recipes: data.results,
                    next: data.next,
                });
            });

        axios.get('http://localhost:8000/categories/')
            .then(res => {
                const categories = res.data.map(x => Object.assign(x, {selected: false}));
                this.setState({
                    categories: categories
                });
            });
    }

    render() {
        return (
            <section>
                <div className="recipe-search" >
                    <form>
                        <input onChange={this.handleChange} name="title" type="text"/>
                        <div className="multiselect">
                            <p onClick={this.showDropdown} >Categories({this.state.categories.filter(x => x.selected)
                                .map(x => 1)
                                .reduce((x, y) => x + y, 0)})</p>
                            {this.state.showDropdown ?
                            <ul
                                className="options"
                                ref={(element) => {
                                    this.dropdownContent = element;
                                }}
                            >
                                {this.state.categories.sort((x, y) => x.name > y.name).map(category => (
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
                        {this.state.recipes.map(recipe =>
                            <Recipe key={ recipe.id } data={recipe} />
                        )}
                        {this.state.next ?
                        <button className="load-recipes" onClick={this.loadMore}>Load More</button>
                        : null}
                    </ul>
                    
                </div>
            </section>
        );
    }
}

export default List;
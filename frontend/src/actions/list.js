import axios from 'axios';

export const addRecipe = state => {
    let { title, description, category, ingredients_write } = state;

    ingredients_write = ingredients_write.slice(0, ingredients_write.length - 1);

    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};

        let {token} = getState().auth

        let { title, description, category, ingredients_write } = state;
    
        ingredients_write = ingredients_write.filter(x => x !== '');

        console.log(ingredients_write);

        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }

        console.log(headers);

        return axios({
            method: 'post',
            url: 'http://localhost:8000/recipes/',
            headers,
            data: { title, description, category, ingredients_write },
        }).then(res => {
            console.log(res);
            if (res.status < 500) {
                return (res => {
                    return {status: res.status, res};
                })
            } else {
                console.log("Server Error!");
                throw res;
            }
        }).then(res => {
            if (res.status === 201) {
                return dispatch({type: 'ADD_RECIPE', recipe: res.data});
            } else if (res.status === 401 || res.status === 403) {
                dispatch({type: 'AUTHENTICATION_ERROR', data: res.data});
                throw res.data;
            }
        })
    }
}
  
export const updateRecipe = (id, text) => {
    return {
        type: 'UPDATE_RECIPE',
        id,
        text
    }
}
  
export const deleteRecipe = id => {
    return {
        type: 'DELETE_RECIPE',
        id
    }
}

export const fetchRecipes = (url, params={}) => {
    return dispatch => {

        return axios.get('http://localhost:8000/recipes/', {
            params: params
        })
            .then(res => res.data)
            .then(recipes => {
                return dispatch({
                    type: 'FETCH_RECIPES',
                    recipes
                });
            })
    }
}

export const loadMoreRecipes = url => {
    return dispatch => {
        return axios.get(url)
            .then(res => res.data)
            .then(recipes => {
                return dispatch({
                    type: 'LOAD_MORE_RECIPES',
                    recipes
                })
            })
    }
}

export const fetchCategories = () => {
    return dispatch => {
        let headers = {"Content-Type": "application/json"};
        return fetch('http://localhost:8000/categories/', {headers, })
            .then(res => res.json())
            .then(categories => {
                return dispatch({
                    type: 'FETCH_CATEGORIES',
                    categories
                })
            })
    }
}

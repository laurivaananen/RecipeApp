import axios from 'axios';

export const addRecipe = state => {
    let { title, description, category, ingredients_write } = state;

    ingredients_write = ingredients_write.slice(0, ingredients_write.length - 1);

    // return dispatch => {
    //     return axios.post('http://localhost:8000/recipes/', { title, category, description, ingredients_write })
    //         .then(res => res.data)
    //         .then(recipe => {
    //             return dispatch({
    //                 type: 'ADD_RECIPE',
    //                 recipe
    //             })
    //         });
    //     }


    return (dispatch, getState) => {
        let headers = {"Content-Type": "application/json"};
        let {token} = getState().auth;
    
        if (token) {
          headers["Authorization"] = `Token ${token}`;
        }
    
        let body = JSON.stringify({title, description, category, ingredients_write});
        console.log(body);
        return fetch("http://locahost:8000/recipes/", {headers, method: "POST", body})
          .then(res => {
            if (res.status < 500) {
              return res.json().then(data => {
                return {status: res.status, data};
              })
            } else {
              console.log("Server Error!");
              throw res;
            }
          })
          .then(res => {
            if (res.status === 201) {
              return dispatch({type: 'ADD_RECIPE', note: res.data});
            } else if (res.status === 401 || res.status === 403) {
              dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
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

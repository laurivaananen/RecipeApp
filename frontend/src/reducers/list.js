const initialState = {
    recipes: [],
    next: '',
    categories: [],
};
  
  
export default function recipes(state=initialState, action) {
    let recipeList = {...state};
  
    switch (action.type) {
  
    case 'ADD_RECIPE':
        return  {...state, ...action.recipe};
  
    case 'UPDATE_RECIPE':
        let recipeToUpdate = recipeList[action.id]
        recipeToUpdate.text = action.text;
        recipeList.splice(action.id, 1, recipeToUpdate);
        return recipeList;
  
    case 'DELETE_RECIPE':
        recipeList.splice(action.id, 1);
        return recipeList;
        default:
            return state;

    case 'FETCH_RECIPES':
        return {...state, recipes: [...action.recipes.results], next: action.recipes.next}

    case 'LOAD_MORE_RECIPES':
        return {...state, recipes: [...state.recipes, ...action.recipes.results], next: action.recipes.next}

    case 'FETCH_CATEGORIES':
        return {...state, categories: [...action.categories]}

    }

    
}
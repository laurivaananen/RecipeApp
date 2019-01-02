import { combineReducers } from 'redux';
import recipes from "./list";
import auth from './auth';


const recipeApp = combineReducers({
    recipes, auth,
});

export default recipeApp;
import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from "react-router-dom";
import './App.css';
import List from './components/List';
import AddForm from './components/AddForm';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import { Provider, connect } from "react-redux";
import recipeApp from "./reducers";
import {auth} from './actions';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

let store = createStore(recipeApp, applyMiddleware(thunk));


class RootContainerComponent extends Component {

    componentDidMount() {
        this.props.loadUser();
    }

    PrivateRoute = ({component: ChildComponent, ...rest}) => {
        return <Route {...rest} render={props => {
            if (this.props.auth.isLoading) {
                return <em>Loading...</em>
            } else if (!this.props.auth.isAuthenticated) {
                return <Redirect to='/login' />;
            } else {
                return <ChildComponent {...props} />
            }
        }} />
    }

    render() {
        let {PrivateRoute} = this;
        return (
            <BrowserRouter basename="/cooking">
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={List} />
                    <Route exact path="/register/" component={Register} />
                    <PrivateRoute exact path="/add/" component={AddForm} />
                    <Route exact path="/login" component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </div>
            </BrowserRouter>
        );
    }
}


const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        loadUser: () => {
            return dispatch(auth.loadUser());
        }
    }
}

let RootContainer = connect(mapStateToProps, mapDispatchToProps)(RootContainerComponent);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootContainer />
            </Provider>
        )
    }
}

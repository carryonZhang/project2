import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {createStore, applyMiddleware, compose} from 'redux';
import createReducer from './reducerLoader';

const configureStore = (initialState = {}) => {

    const middleware = [
        thunkMiddleware,
        createLogger(),
    ];

    const store = createStore(
        createReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware)
        )
    );

    store.asyncReducers = {};


    return store;
};


export default configureStore;

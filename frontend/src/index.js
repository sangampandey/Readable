import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk'; //Thunk middleware for Redux
import reducer from './reducer/index';
import {Provider} from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/**
 * Out of the box, the Redux store can only support the synchronous flow of data.
 * Using middleware like thunk helps support asynchronicity in a Redux application.
 * You can think of thunk as a wrapper for the store’s dispatch() method; rather than returning action objects,
 * we can use thunk action creators to dispatch functions or Promises.
 * Note that without thunks, synchronous dispatches are the default.
 */
const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

console.log(store.getState());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
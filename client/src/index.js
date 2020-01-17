import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/rootReducer';
import {addpost} from './components/login';
const store=createStore(rootReducer);
//store.dispatch(addpost);console.log(addpost);

ReactDOM.render(<App />, document.getElementById('root'));
//store.dispatch(addpost);console.log(addpost);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
export default store;

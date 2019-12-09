import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

import reducer from "../src/redux/store/reducer";
import {compose} from  "redux";

import { createStore} from 'redux';


//import Provider from react-redux
import {Provider} from 'react-redux';

//create a store and pass reducer as an argument
const store = createStore(reducer,
    
    compose(
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    )
);

ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();




// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';

// import reducer from "../src/redux/store/reducer";
// import {compose} from  "redux";

// import { createStore} from 'redux';

// //import Provider from react-redux
// import {Provider} from 'react-redux';

// //create a store and pass reducer as an argument
// const store = createStore(reducer,
    
//     compose(
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//     )
// );

// //render App component on the root element
// ReactDOM.render(<Provider store = {store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();
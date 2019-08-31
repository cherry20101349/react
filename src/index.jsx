import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import axios from '../src/assets/utils/axios';
import './index.css';
import './assets/styles/reset.scss';
import App from './App.tsx';
// import './assets/schemas/public'
React.Component.prototype.$axios = axios;
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

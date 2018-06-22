import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js'
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import store from './Data/store.js';

ReactDOM.render(
<Provider store={store}>
 <App />
</Provider>,
document.getElementById('root'));
registerServiceWorker();

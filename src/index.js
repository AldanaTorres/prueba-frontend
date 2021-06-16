import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';

import reducers from './app/reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import keycloak from './keycloak';
import reportWebVitals from './reportWebVitals';

window.axios= axios;


axios.interceptors.request.use(
    
  config => {
      keycloak.updateToken(1000).then((refreshed) => {
          
          if (refreshed) {
              localStorage.setItem("react-token", keycloak.token);
              localStorage.setItem("react-refresh-token", keycloak.refreshToken);
              console.debug('Token refreshed' + refreshed);
          } else {
              console.warn('Token not refreshed, valid for '
                  + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
          }
      }).catch(() => {
          console.error('Failed to refresh token');
      });
      const token = keycloak.token;
      if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
}, error => {
  // handle the error
  return Promise.reject(error);
});


const middleware = composeWithDevTools(applyMiddleware(reduxThunk));

const store = createStore(reducers, middleware);





ReactDOM.render(
    <Provider store={store}>
      <App />,
    </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
serviceWorker.unregister();

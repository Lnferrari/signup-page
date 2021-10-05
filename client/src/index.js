import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import UserState from './context/UserState';
import './scss/main.scss'

ReactDOM.render(
  <UserState>
    <App />
  </UserState>,
  document.getElementById('root')
);

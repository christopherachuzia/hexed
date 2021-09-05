import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import * as socketio from './utils/socketclient'
import C from './store/actiontype'

import storeFactory from './store'

const store = storeFactory()

socketio.initializeSocket('127.0.0.1')

socketio.on('update-client-library',({book})=>{
  store.dispatch({
    type: C.UPDATE_BOOK,
    value: book
  })
})

socketio.on('remove-from-client', _id =>{
  store.dispatch({
    type: C.DELETE_BOOK,
    value: {_id}
  })
})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

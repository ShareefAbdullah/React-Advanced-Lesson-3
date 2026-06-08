import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';

const initialState = {
  clients: [],
  message: "",
  isError: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "load/clients/fulfilled":
      return {
        ...state,
        clients: action.payload
      }
    case "load/clients/rejected":
      return {
        ...state,
        isError: true,
        message: action.payload
      }
    case "remove/clients/fulfilled":
      return {
        ...state,
        clients: state.clients.filter((client) => client.id !== action.payload)
      }
    case "edit/clients/fulfilled":
      return {
        ...state,
        clients: state.clients.map((client) => {
          if (client.id === action.payload.id) {
            return {
              ...client,
              phone: action.payload.phone
            }
          }
          return client;
        })
      }
      
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);



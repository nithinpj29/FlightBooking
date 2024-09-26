import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles.css';
import ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './redux/store'; //

let root = ReactDOMClient.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <React.StrictMode>
    
      <App />
      
      
    </React.StrictMode>

    </Provider>
  );

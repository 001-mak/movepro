import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';

import { Provider } from 'react-redux';
import store from '../src/redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DynamicModal from './common/Modals/DynamicModal';
import { ModalProvider } from './common/Modals/ModalContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ToastContainer />
    <ModalProvider>
      <Router>
        <App />
        <DynamicModal />
      </Router>
    </ModalProvider>
  </Provider>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "react-query";

import './index.css';
import App from './App';
import Popup from './components/popup/Popup';
import store from './store/store';
import { Provider } from 'react-redux';

let popupDiv: any = document.getElementById("popup-root");

const insertionPoint = document.createElement('div');
insertionPoint.id = 'insertion-point';
const body = document.body.parentNode
if (body) {body.insertBefore(insertionPoint, document.body)}
// main(), might need to be moved into useeffect

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(insertionPoint);
!popupDiv &&
    root.render(
    <React.StrictMode>
        <Provider store={store} >
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
    );

const popupRoot = ReactDOM.createRoot(popupDiv);
popupDiv &&
  popupRoot.render(
    <React.Fragment>
      <Popup />
    </React.Fragment>
  );
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Popup from './components/popup/Popup';

let popupDiv: any = document.getElementById("popup-root");

const insertionPoint = document.createElement('div');
insertionPoint.id = 'insertion-point';
const body = document.body.parentNode
if (body) {body.insertBefore(insertionPoint, document.body)}
// main(), might need to be moved into useeffect

const root = ReactDOM.createRoot(insertionPoint);
!popupDiv &&
    root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    );

const popupRoot = ReactDOM.createRoot(popupDiv);
popupDiv &&
  popupRoot.render(
    <React.Fragment>
      <Popup />
    </React.Fragment>
  );
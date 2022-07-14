import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Menu from './components/Menu';
// import main from './local-api/main';
import Listen from './Listen';
import PopupComponent from './components/PopupComponent';

const popupRoot = document.getElementById("popup-root");

const insertionPoint = document.createElement('div');
insertionPoint.id = 'insertion-point';
document.body.parentNode.insertBefore(insertionPoint, document.body);
// main(), might need to be moved into useeffect

const root = ReactDOM.createRoot(insertionPoint);
!popupRoot &&
    root.render(
    <React.StrictMode>
        <Listen />
    </React.StrictMode>
    );

popupRoot &&
  ReactDOM.render(popupRoot).render(
    <React.Fragment>
      <PopupComponent />
    </React.Fragment>
  );
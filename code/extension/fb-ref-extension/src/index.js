import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Menu from './Menu';

const insertionPoint = document.createElement('div');
insertionPoint.id = 'insertion-point';
document.body.parentNode.insertBefore(insertionPoint, document.body);


const root = ReactDOM.createRoot(insertionPoint);
root.render(
  <React.StrictMode>
    <Menu />
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
// @ts-ignore
import { BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./services/store";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Router>
          <Provider store={store}>
              <DndProvider backend={HTML5Backend}>
                <App/>
              </DndProvider>
          </Provider>

      </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

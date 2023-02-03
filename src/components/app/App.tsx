import React from 'react';
import Login from '../login/Login';
import {Route, Routes, BrowserRouter,} from "react-router-dom";
import './App.css';
import Products from '../products-table/ProductsTable.js';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Home from '../home/Home';


const App = () => {
    return (       
      <Provider store={store}>
        <header className="app-header">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login/>} />
                <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                <Route path="/table" element={<ProtectedRoute><Products/></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </header>
      </Provider>
    );
  }
  export default App;
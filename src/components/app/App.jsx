import React , {useState} from 'react';
import Login from '../login/Login';
import {Route, Routes, BrowserRouter,} from "react-router-dom";
import './App.css';
import Products from '../products-table/ProductsTable.jsx';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import Home from '../home/Home';


const App = () => {

    const [nome_Usuario, setNomeUsuario] = useState('');
    const [idLoja, setIdLoja] = useState('');

    return (       
      <Provider store={store}>
        <header className="app-header">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login setNomeUsuario={setNomeUsuario}  setIdLoja={setIdLoja} />} />
                <Route path="/home" element={<ProtectedRoute><Home nomeDoUsuario={nome_Usuario} /></ProtectedRoute>}/>
                <Route path="/table" element={<ProtectedRoute><Products nomeDoUsuario={nome_Usuario}  IdDaLoja={idLoja} /></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </header>
      </Provider>
    );
  }
  export default App;
import React, { ChangeEvent, useState } from 'react';
import './Login.css';
import TextField from '@mui/material/TextField';
import {Button} from '@mui/material';
import { useDispatch } from 'react-redux';
import { store } from '../../redux/store';
import { loginEnter, loginError } from '../../redux/loginSlice';
import { useNavigate } from 'react-router-dom';
import { verifyCredentials } from '../../services/authService';
import logo2 from './logo2.png';

function Login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  store.subscribe(() => {
    setErrorMessage(store.getState().login.errorMessage);
    if(store.getState().login.isLogged == true)
      navigate('/home');
  })

  const dispatch = useDispatch()

  function onChangeUserName(e:ChangeEvent<HTMLInputElement>){
    setUserName(e.currentTarget.value)
  }
  
  function onChangePassword(e:ChangeEvent<HTMLInputElement>){
    setPassword(e.currentTarget.value)
  }
  
  function onClickEnter(){
    if( verifyCredentials(userName, password) )
      dispatch(loginEnter());
    else
      dispatch(loginError());
  }

  return (
      <header className="login-header">
        <div className="box">
          <div className="login-message">
            <span className= "login-form-tittle"><img className="image" src={logo2} alt ="G3"/></span>
          </div>

          <TextField
              className='wrap-input'
              required
              id="user-name"
              label="Usuário"
              defaultValue=""
              onChange={onChangeUserName}
            />

          <TextField
              className='wrap-input'
              required
              id="user-password"
              label="Senha"
              defaultValue=""
              type="password"
              onChange={onChangePassword}
            />

          <div className="login-error">
            {errorMessage}
          </div>

            <Button className='btn' variant="contained" onClick={onClickEnter}>Login</Button>
        </div>
        
      </header>

  );
}

export default Login; 

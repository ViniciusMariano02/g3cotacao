import React, { useState  } from 'react';
import './Login.css';
import TextField from '@mui/material/TextField';
import {Button, Input} from '@mui/material';
import { useDispatch } from 'react-redux';
import { store } from '../../redux/store';
import { loginEnter, loginError } from '../../redux/loginSlice';
import { useNavigate } from 'react-router-dom';
//import { verifyCredentials } from '../../services/authService';
import logo2 from './assets/logo2.png';
import fundoBox from './assets/fundoBox.png';


export function Login({setNomeUsuario, setIdloja, setCnpj}) {

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState([]);
  
  const navigate = useNavigate();

  function funçoes (){
    users();
    login();
  }

  async function users() 
  {
    const result = await fetch (`http://8b38091fc43d.sn.mynetname.net:2000/user/${userId}/${password} `, {
    })

    const data = await result.json();          
    setUser(data);
    setNomeUsuario(data.razao_social);
    setIdloja(data.id);
    setCnpj(data.numero_documento);
  }
  
  async function login() 
    {
      const result = await fetch (`http://8b38091fc43d.sn.mynetname.net:2000/user/${userId}/${password} `, {
      })
      .then(async (res) => {
        if( res.status === 200){
          dispatch(loginEnter());
        }
        else{
          dispatch(loginError());
        }
      }).catch((err)=>{
        console.log(err.message)      
    }, []);
    }

  console.log(user)

    
  store.subscribe(() => {
    setErrorMessage(store.getState().login.errorMessage);
      if(store.getState().login.isLogged === true)
        navigate('/home');
        })

  const dispatch = useDispatch()

  function onChangeUserName(e){
    setUserId(e.currentTarget.value)
  }
  
  function onChangePassword(e){
    setPassword(e.currentTarget.value)
  }

  document.addEventListener('keydown', function(e) {
    if(e.key === "Enter"){
      document.getElementById("btEntrar").click();
    }
  });

  //function onClickEnter(){
    //if( verifyCredentials(userId, password) )
      //dispatch(loginEnter());
    //else
      //dispatch(loginError());
  //}  

  return (
    

    
      <header  className="login-header">
        <div className="box" style={{"background-image": `url(${fundoBox})`}} >  
          <div className="login-message">
            <span className= "login-form-tittle"><img className="image" src={logo2} alt ="G3"/></span>
          </div>

      
          <Input
              className='wrap-input'
              required
              id="user-name"
              placeholder=" Código"
              defaultValue=""
              onChange={onChangeUserName}
            />

          <Input
              className='wrap-input'
              required
              id="user-password"
              placeholder=" Senha"
              defaultValue=""
              type="password"
              onChange={onChangePassword}
            />

          <div className="login-error">
            {errorMessage}
          </div>

            <button className='btn' id='btEntrar' variant="contained" onClick={funçoes} >Login</button>

            

        </div>
      </header>  
    
  );
}



export default Login;



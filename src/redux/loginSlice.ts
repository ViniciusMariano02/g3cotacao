import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: "",
    isLogged: false,
    errorMessage: ""
  },
  reducers: {
      loginError(state){
        localStorage.setItem('authenticated', "0");
        return {... state, userId:"", password:"", isLogged:false, errorMessage:"Usuário não encontrado"}
      },
      loginLogout(state){
        localStorage.setItem('authenticated', "0");
        return {... state, userId:"", password:"", isLogged:false, errorMessage:""}
      },
      loginEnter(state){
        localStorage.setItem('authenticated', "1");
        const token:string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ";
        localStorage.setItem('token', token);
        
        return {... state, userId:"", password:"", isLogged:true, errorMessage:""}
      },
      loginExit(state){
        localStorage.removeItem('token')
        return {...state, userId:"", password:"", isLogged:false, errorMessage:""}
      }
    },
})

export const { loginError, loginLogout, loginEnter, loginExit } = loginSlice.actions
export default loginSlice.reducer
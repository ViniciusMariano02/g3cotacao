import React from "react";
import logo2 from "./logo2.png"
import './Quotations.css'
import { Link } from "react-router-dom";
import Alert, { AlertProps } from '@mui/material/Alert';

function Quotations(){

    return(
        <div>
            <header className="app-header3">
                <h1 className="app-title2"><span><img src={logo2} className="imageHome" alt='G3'/></span>Cotação</h1> <p className='Brand'>MASTERBOI LTDA <Link to='/' className='link'>Sair</Link> </p>
            </header>

            <div className="btns">

                <Link to ="/home" className="op1">Principal</Link>

                <Link to ="/quotations" className="op2">Cotação</Link>

            </div>

            <div>
                 <p className="CD"> <i><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></i>Cotações Disponiveis : <Link className="LC" to="/table">Cotação Perifericos</Link> </p>
            </div>

            <footer className="Ver">Versão 1.23.0, G3 SOLUÇÕES EM TECNOLOGIA.</footer>
        </div>
    )
}

export default Quotations()

import React from "react";
import logo2 from "./logo2.png"
import './Home.css'
import { Link } from "react-router-dom";



function Home(){

    return(
        <div>
            <header className="app-header3">
                <h1 className="app-title2"><span><img src={logo2} className="imageHome" alt='G3'/></span>Cotação</h1><p className='Brand'>MASTERBOI LTDA <Link to='/' className='link'>Sair</Link> </p>
            </header>
            <div className="btns">
                <Link to ="/home" className="op1">Principal</Link>
            <   Link to ="/quotations" className="op2">Cotação</Link>
            </div>

            <div><p className="texto"> <i><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" /></svg></i> Atenção Fornecedor</p></div>

            <footer className="Ver">Versão 1.23.0, G3 SOLUÇÕES EM TECNOLOGIA.</footer>

        </div>
    )
}

export default Home()
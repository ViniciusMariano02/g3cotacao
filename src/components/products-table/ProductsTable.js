import React, { useState, useEffect, useMemo } from 'react';
import "./ProductsTable.css";
import logo2 from "../assets/logo2.png"
import {loginLogout} from '../../redux/loginSlice';
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [selectedQuotation, setSelectedQuotation] = useState();
    const [detalhe, setDetalhe] = useState([]);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch ("http://8b38091fc43d.sn.mynetname.net:2000/cotacao/fornecedor/529"); 
            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    }, []);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    function onChangeLogin(){
        dispatch(loginLogout())
        navigate('/')
    }

    function getFilteredList(){
        if (!selectedQuotation) {
            setDetalhe(products.filter((product) => product.descricao === selectedQuotation))
        }
        setDetalhe( products.filter((product) => product.descricao === selectedQuotation))
    }

    var filteredList = useMemo(getFilteredList, [selectedQuotation, products]);

    function handleQuotationChange(event){
        setSelectedQuotation(event.target.value);
    }

    const [isEdit, setEdit] = useState(false);
    
    const handleEdit = () =>{
        setEdit(!isEdit);
    }

    const handleInputChange01 = (e, index, id) =>{
        const {target} = e;
        setDetalhe(
            (prevList) => {
                const newList = [...prevList];
                newList[index].detalhe.find(el => el.id === id).observacao = target.value;
                return newList;
            }
        )
    }

    useEffect(() => {
        document.addEventListener("keydown", function (event) {
          if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
            var form = event.target.form;
            var index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 2].focus();
            event.preventDefault();
          }
        });
      }, []);

    const handleInputChange = (e, index, id) =>{
        const {target} = e;
        setDetalhe (
            (prevList) => {
                const newList = [...prevList];
                newList[index].detalhe.find(el => el.id === id).valor_custo_fornecedor = target.value;
                return newList;
            }
        )
    }

    const handleSave = async(e) => {
        e.preventDefault();
        fetch("http://10.0.1.94:8088/cotacao/save",{ 
            method:"PUT", 
            headers:{"content-type":"application/json"},
            body:JSON.stringify(products)
        }).then((res)=>{
            if( res.status === 201){ 
                setEdit(!isEdit); 
                alert('Salvo com sucesso.'); 
            }
        }).catch((err)=>{
            console.log(err.message)  
        })
    }

    return(
        <div>
            <div>
                <header className="geral-header">
                    <img className="home-image" src={logo2} alt='G3'/><p className="marca">MASTERBOI LTDA <button className="exit" onClick={onChangeLogin}>Sair</button> </p>
                </header>
            </div>
            <div className="product-list">
            <div className="product">
                <div className="card mt-5 mb-5">

                    <div className="card-header">
                        <Link to ="/home" className="op1">Principal</Link>
                        <Link to ="/table" className="op2">Cotação</Link> 
                    </div>
            
                    <div className="card-body p-0">    

                                <div className="select" >
                                    <select 
                                        name="quotation-list"
                                        id="quotation-list"
                                        onChange={handleQuotationChange}
                                    >  
                                    <option value="None">Selecione a cotação</option>
                                    {products.map((item) => {
                                        return (
                                            <option key={item.id} value={item.descricao}>Cotação: ({item.id}-{item.descricao}) <p className="DHI">Data/Hora Inicio: {item.data_hora_emissao}</p> <p className="DHT">Data/Hora Termino: {item.data_hora_fim_cotacao}</p> </option> 
                                        )
                                    })}
                                    </select>
                                </div>

                        <form onSubmit={handleSave} className="table-responsive"> {}
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th className="border-top-05">
                                            Código
                                        </th>
                                        <th className="border-top-01" scope="col">
                                            Descrição
                                        </th>                                        
                                        <th className="border-top-04">
                                            Código de Barra
                                        </th>                                        
                                        <th className="border-top-03">
                                            Embalagem
                                        </th>
                                        <th className="border-top-07">
                                            Quantidade
                                        </th>
                                        <th className="border-top-02">
                                            Valor
                                        </th>
                                        <th className="border-top-06">
                                            Observação
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {products.length ? (

                                        detalhe.map((products, indexProduto)  => (
                                            products.detalhe.map((detalhes, i) => {

                                                function getBackgroundColor () {
                                                    let color;
                                                    if (detalhes.valor_custo_fornecedor === 0) {
                                                        color = "red";
                                                    } else if (detalhes.valor_custo_fornecedor > detalhes.preco_max) {
                                                        color = 'purple';
                                                    } else if (detalhes.valor_custo_fornecedor < detalhes.preco_min ) {
                                                        color = 'orange';
                                                    }else if (detalhes.valor_custo_fornecedor === null ) {
                                                        color = 'gray';
                                                    }else {
                                                        color = 'green'
                                                    }
                                                    return color;
                                                };

                                                return (
                                                        <tr key={detalhes.id}>
                                                        <td className= "placeholder04">
                                                            {detalhes.id_produto}
                                                        </td>
                                                        <td className="placeholder">
                                                            {detalhes.descricao}
                                                        </td>
                                                        <td className= "placeholder03">
                                                            {detalhes.gtin}
                                                        </td>
                                                        <td id='category' className= "placeholder02" >
                                                            {detalhes.unidade}
                                                        </td>
                                                        <td className= "placeholder06">
                                                            {detalhes.quantidade}
                                                        </td>

                                                        <td className= "edit-input" onDoubleClick={handleEdit}   > R$  
                                                                {isEdit ? 
                                                                (
                                                                <input 
                                                                    className= "edit-input"
                                                                    value={detalhes.valor_custo_fornecedor}  
                                                                    name="valor_custo_fornecedor"
                                                                    type="Number"
                                                                    min="0.01" 
                                                                    step="0.01"
                                                                    onChange={e => handleInputChange(e, indexProduto, detalhes.id)} 
                                                                /> 
                                                                ) :  (detalhes.valor_custo_fornecedor )} {}
                                                                
                                                        </td>
                                                        
                                                        <td className= "placeholder05" onDoubleClick={handleEdit}>{isEdit ? (
                                                            <input className= "placeholder05" value={detalhes.observacao}
                                                            name="observacao" 
                                                            onChange={(e) => handleInputChange01(e, indexProduto, detalhes.id)}
                                                            />
                                                                    
                                                        ) : (detalhes.observacao)}
                                                        </td>
                                                    </tr>
                                                    
                                                )


                                            })                                
                                                
                                        ))
                                            
                                        ) : (
                                            <tr>
                                                <td colspan="4" className="text-danger"> A lista está vazia! </td>
                                            </tr>
                                        )
                                    }
                                    
                                </tbody>
                            </table>
                            <div>

                            <button className="edit" onClick={handleEdit}>
                                <i> 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </i>
                            </button>

                            <button className="save" onSubmit={handleSave}> Salvar </button> {}

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    );
}

export default Products

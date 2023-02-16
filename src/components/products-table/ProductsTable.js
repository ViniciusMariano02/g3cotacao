import React, { useState, useEffect, useMemo } from 'react';
import "./ProductsTable.css";
import logo2 from "../assets/logo2.png"
import {loginLogout} from '../../redux/loginSlice';
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';


export const Products = ({usuario}) => {
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

    console.log(usuario);

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
          if (event.key === "Enter" && event.target.nodeName === "INPUT") {
            var form = event.target.form;
            var index = Array.prototype.indexOf.call(form, event.target);
            form.elements[index + 1].focus();
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
        fetch("http://8b38091fc43d.sn.mynetname.net:2000/cotacao/save",{ 
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

    const getCelColor = (detalhes) => {
        if (detalhes.valor_custo_fornecedor < detalhes.preco_min){
            return 'red';
        }else if (detalhes.valor_custo_fornecedor > detalhes.preco_max){
            return 'orange';
        }else{
            return 'green';
        }
    }

    window.onbeforeunload = confirmExit;
    function confirmExit(e)
  { e.preventDefault()
    return "Seus dados não salvos serão perdidos. Deseja Realmente sair?";
  }

    const valoresp = (detalhes) =>{
        if(detalhes.preco_max === null && detalhes.preco_min === null){    
            detalhes.preco_max = 9999;
            detalhes.preco_min = 0
        }else if (detalhes.preco_max === 0 && detalhes.preco_min === 0){
            detalhes.preco_max = 9999;
            detalhes.preco_min = 0
        }else if (detalhes.preco_max > 0 && detalhes.valor_custo_fornecedor > detalhes.preco_max){
            detalhes.valor_custo_fornecedor = null
        }else if (detalhes.preco_min > 0 && detalhes.valor_custo_fornecedor < detalhes.preco_min){
            detalhes.valor_custo_fornecedor = null

        }
    }

    return(

        <div className='geral'>

            <div className='container'>
                <header className="geral-header">
                    <img className="home-image" src={logo2} alt='G3'/>
                </header>
                <p className="marca">MASTERBOI LTDA <button className="exit" onClick={onChangeLogin}>Sair</button> </p>
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
                                        disabled={isEdit} 
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

                        <div className='over'>         
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
                                                            {detalhes.quantidade.toFixed(3).replace(".", ",")}
                                                        </td>

                                                        <td className= "edit-input" onDoubleClick={handleEdit}> R$  
                                                                {isEdit ? 
                                                                (
                                                                <input 
                                                                    className= "edit-input"
                                                                    style={{color: getCelColor(detalhes)}}
                                                                    onBlur={valoresp(detalhes)}
                                                                    value={detalhes.valor_custo_fornecedor}
                                                                    name="valor_custo_fornecedor"
                                                                    type="Float"
                                                                    min="0" 
                                                                    step="0"
                                                                    onChange= {e => handleInputChange(e, indexProduto, detalhes.id)} 
                                                                /> 
                                                                ) :  parseFloat(detalhes.valor_custo_fornecedor).toFixed(2).replace("NaN", " ")}
                                                                
                                                        </td>
                                                        
                                                        <div className= "placeholder05" onDoubleClick={handleEdit} name="observacao" 
                                                                style={{width: '20vw', height: '15vh', overflowY: 'auto'}}>
                                                        {isEdit ? (
                                                            <textarea className= "placeholder05" value={detalhes.observacao}
                                                            name="observacao"
                                                            style={{width: '20vw', height: '15vh', overflowY: 'auto'}}
                                                            onChange={(e) => handleInputChange01(e, indexProduto, detalhes.id)}
                                                            />
                                                                    
                                                        ) : (detalhes.observacao)
                                                        }
                                                        </div>
                                                        
                                                    </tr>
                                                    
                                                )


                                            })                                
                                                
                                        ))
                                            
                                        ) : (

                                            <tr>
                                                <td colspan="4" className="text-danger"> <i className='danger-icon'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                                        </svg>
                                                </i> Você não possui cotações disponíveis!!</td>
                                            </tr>
                                        )
                                    }
                                    
                                </tbody>

                            </table>
                        </div> 
                        
                        </form>

                            <div className='botao'>

                            <h3 className='legenda'> <p className='up'> ACIMA </p>  <p className='down'> ABAIXO  </p> </h3> 

                            <button className="edit" onClick={handleEdit}>
                                <i> 
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </i>
                            </button>

                            <div>
                               <button className="save" onClick={handleSave}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
  <path fillRule="evenodd" d="M2 4.75C2 3.784 2.784 3 3.75 3h4.836c.464 0 .909.184 1.237.513l1.414 1.414a.25.25 0 00.177.073h4.836c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0116.25 17H3.75A1.75 1.75 0 012 15.25V4.75zm8.75 4a.75.75 0 00-1.5 0v2.546l-.943-1.048a.75.75 0 10-1.114 1.004l2.25 2.5a.75.75 0 001.114 0l2.25-2.5a.75.75 0 10-1.114-1.004l-.943 1.048V8.75z" clipRule="evenodd" />
</svg>
 </button> {} 
                            </div>
                            
                            </div>

                    </div>

                </div>

            </div>

        </div>

        </div>
        
    );
}

export default Products

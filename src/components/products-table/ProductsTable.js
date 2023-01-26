import React, { useState, useEffect } from 'react';
import "./ProductsTable.css";
import logo2 from "../assets/logo2.png"
import { Link } from 'react-router-dom';

export const Products = () => {
    const [products, setProducts] = useState([]);
    const [filterParam, setFilterParam] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["descricao", "id"]);

    useEffect(() => {
        async function fetchData (){
            const response = await fetch ("http://8b38091fc43d.sn.mynetname.net:2000/cotacao/fornecedor/529"); 
            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    }, []);

    const data = Object.values(products);

    function search(products) {
        return products.filter((product) => {
            if (product.descricao == filterParam) {
                return searchParam.some((newProduct) => {
                    return(
                        product[newProduct]
                                .toString()
                                .toLowerCase()
                                .indexOf(q.toLowerCase()) > 0
                    );
                });
            } else if (filterParam == "All"){
                return searchParam.some((newProduct) =>{
                    return (
                        product[newProduct]
                                .toString()
                                .toLowerCase()
                                .indexOf(q.toLowerCase()) > 0
                    );
                });
            }
        });
    }

    const [isEdit, setEdit] = useState(false);
      
      console.log(products);
    

    const handleEdit = () =>{
        setEdit(!isEdit);
    }

    const handleInputChange01 = (e, index) =>{
        const {name, value} = e.target;
        const list = [...products];
        list[index][name] = value
        setProducts(list);
    }


    const handleInputChange = (e, index) =>{
            const {name, value} = e.target; 
            const list = [...products]; 
            list[index][name] = value; 
            setProducts(list); 
    }

    const handleSave = async(e) => {
            e.preventDefault();
            fetch("http://8b38091fc43d.sn.mynetname.net:2000/cotacaoDetalhe/save",{ 
                method:"POST", 
                headers:{"content-type":"application/json"}, 
                body:JSON.stringify(products) 
            }).then((res)=>{
                if(res.status === 200 || res.status === 201){ 
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
                    <h2 className="title-geral"><span><img className="home-image" src={logo2} alt='G3'/>Cotações</span><p className="marca">MASTERBOI LTDA<Link className="exit" to='/'>Sair</Link></p></h2>
                </header>
            </div>
            <div className="product-list">
            <div className="product">
                <div className="card mt-5 mb-5">
                    <div className="card-header">
                         Cotações disponiveis  
                    </div>
                    <div className="card-body p-0">
                    <div className="select" >
                                    <select onChange={(e) => {
                                        setFilterParam(e.target.valeu);
                                        }}
                                        className = "custom-select"
                                        aria-label = "Filtro por cotação"
                    >
                                    <option value={products.descricao}>Cotação 1</option>
                                    <option value={products.descricao}>Cotação 2</option>
                                    <option value={products.detalhe}>Cotação 3</option>
                                    <option value={products.detalhe}>Cotação 4</option>
                                    </select>
                                </div>
                        <form onSubmit={handleSave} className="table-responsive"> {}
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th className="border-top-01" scope="col">
                                            Descrição
                                        </th>
                                        <th className="border-top-02">
                                            Valor
                                        </th>
                                        <th className="border-top-03">
                                            Embalagem
                                        </th>
                                        <th className="border-top-04">
                                            Código de Barra
                                        </th>
                                        <th className="border-top-05">
                                            Código
                                        </th>
                                        <th className="border-top-06">
                                            Observação
                                        </th>
                                        <th className="border-top-07">
                                            Quantidade
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {products.length ? (

                                        products.map((products)  => (
                                            products.detalhe.map((detalhes, i) => {
                                                return (
                                                        <tr key={detalhes.id}>
                                                        <td className="placeholder">
                                                            {detalhes.descricao}
                                                        </td>
                                                        <td className= "edit-input" onDoubleClick={handleEdit}>{}
                                                            {isEdit ? 
                                                            (
                                                            <input 
                                                                className= "edit-input"
                                                                value={detalhes.valor_custo_fornecedor || ''}  
                                                                name="valor_custo_fornecedor"
                                                                onChange={(e) => handleInputChange(e, i)} 
                                                            />
                                                            ) : (detalhes.valor_custo_fornecedor )} {}
                                                        </td>
                                                        <td id='category' className= "placeholder02" >
                                                            {detalhes.unidade}
                                                        </td>
                                                        <td className= "placeholder03">
                                                            {detalhes.gtin}
                                                        </td>
                                                        <td className= "placeholder04">
                                                            {detalhes.id_produto}
                                                        </td>
                                                        <td className= "placeholder05" onDoubleClick={handleEdit}>{isEdit ? (
                                                            <input className= "placeholder05" value={detalhes.observacao}
                                                            name="observacao"
                                                            onChange={(e) => handleInputChange01(e, i)}
                                                            />
                                                                
                                                        ) : (detalhes.observacao)}
                                                        </td>

                                                        <td className= "placeholder06">
                                                            {detalhes.quantidade}
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
                                <i><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg></i>
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
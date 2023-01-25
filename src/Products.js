import React, { useState, useEffect } from 'react';

export const Products = () => {
    //Estado que armazena as informações da api
    const [products, setProducts] = useState([]);

    //Função para pegar as informações da api
    useEffect(() => {
        async function fetchData (){
            const response = await fetch ("http://8b38091fc43d.sn.mynetname.net:4000/cotacao/fornecedor/529"); //Armazena em response as informações obtidas no fetch da url
            const data = await response.json();// converte para JSON as informações armazenadas em response
            setProducts(data.detalhe);// Seto o estado de products com as informações ja transformadas em json
        }
        fetchData();
    }, []);

    // Variavel que indica se esta em modo editavel ou não, inicio ela como false para iniciar sem editar
    const [isEdit, setEdit] = useState(false);
      
      console.log(products);
    
    //Função para mudar o estado para editavel
    const handleEdit = () =>{
        setEdit(!isEdit);
    }
    
    // Função para obter o valor inserido ao digitar
    const handleInputChange = (e, index) =>{
            const {name, value} = e.target; // É feito a desestruturação para que o evento de digitar pegue o nome e o value
            const list = [...products]; // Armazena em uma variavel lista, os dados armazenados em products
            list[index][name] = value; // Dentro da lista pegamos o index do elemento que estamos alterando e informando o value que foi digitado
            setProducts(list); // Seta os valores da lista que acabamos de modificar em products, agora a lista de products ja esta atualizada
    }

    //Função para salvar as alterações na api
    const handleSave = async(e) => {
            e.preventDefault();
            fetch("http://10.0.1.10:8088/cotacaoDetalhe/save",{ //realiza o fetch na url que faz o tratamento do update
                method:"POST", // Informo o metodo que vai ser usado que no caso é o POST para enviar as informações
                headers:{"content-type":"application/json"}, // Informa o conteudo do header que é uma aplicação json
                body:JSON.stringify(products) // no body indico que as informações do corpo serão string json, e coloco o products que contem as informações que quero enviar
            }).then((res)=>{
                if(res.status === 200 || res.status === 201){ // Verifica se o status obtido da requisição se é 200 ou 201 (200 é ok para o get da informação e 201 é o create)
                    setEdit(!isEdit); // caso tenha criado corretamente e retornado o 201, vai mudar o estado de edição para false
                    alert('Saved successfully.'); // alerta para indicar que foi salvo com sucesso caso a informação do if ocorra
                }
            }).catch((err)=>{
                console.log(err.message) // tras o retorno de erro da requisição 
            })
    }
    
    return(
        <div className="product-list">
            <div className="product">
                <div className="card mt-5 mb-5">
                    <div className="card-header">
                         Lista de produtos
                        </div>
                    <div className="card-body p-0">
                        <form onSubmit={handleSave} className="table-responsive"> {/* envolvi em um form informando onSubmit como a função que salva e envia para a api */}
                            <table className="table mb-0">
                                <thead>
                                    <tr>
                                        <th className="border-top-0" scope="col">
                                            Descrição
                                        </th>
                                        <th className="border-top-0">
                                            Valor
                                        </th>
                                        <th className="border-top-0">
                                            Embalagem
                                        </th>
                                        <th className="border-top-0">
                                            Código de Barra
                                        </th>
                                        <th className="border-top-0">
                                            Código
                                        </th>
                                        <th className="border-top-0">
                                            Observação
                                        </th>
                                        <th className="border-top-0">
                                            Quantidade
                                        </th>
                                        <th className="border-top-0">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {products.length ? (

                                            products.map((product, i) => {
                                                
                                                return (
                                                        <tr key={product.id}>
                                                            <td>
                                                                {product.descricao}
                                                            </td>
                                                            <td onDoubleClick={handleEdit}>{/* dentro da celula da tabela foi colocado uma função de dois clicks puxando a função que muda o estado de editavel, que iniciou como false e agora ficou true */}
                                                                {isEdit ? {/* Caso o estado da edição esteja true, ele mostra nessa celula um input para digitar o valor novo */}
                                                                (
                                                                <input
                                                                    value={product.valor_custo_fornecedor || ''} // Dentro do input informo o valor inicial dele que é o campo valor_custo_fornecedor como esta na api
                                                                    name="valor_custo_fornecedor"
                                                                    onChange={(e) => handleInputChange(e, i)} // coloco no onChange a função que pegar os digitos em tempo real que esta sendo digitado e seta na lista a informação digitada
                                                                />
                                                                ) : (product.valor_custo_fornecedor )} {/*caso o estado de edição esteja false ele apenas mostra a informação que esta na api nessa posição */}
                                                            </td>
                                                            <td id='category'>
                                                                {product.unidade}
                                                            </td>
                                                            <td>
                                                                {product.gtin}
                                                            </td>
                                                            <td>
                                                                {product.id_produto}
                                                            </td>
                                                            <td>
                                                                {product.observacao}
                                                            </td>
                                                            <td>
                                                                {product.quantidade}
                                                            </td>
                                                        </tr>
                                                    )
                                            })
                                        ) : (
                                            <tr>
                                                <td colspan="4" className="text-danger"> A lista esta vazia!! </td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                            <button className="btn btn-sm mr-2" onClick={handleEdit}> {/* informo no botão de editar a função responsavel por mudar o estado de edição, pode tanto clicar aqui quanto os dois clicks na celular para deixar ele como true */}
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button onSubmit={handleSave}> Salvar </button> {/* no botão de salvar fica a função que envia as informações novas para a api */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

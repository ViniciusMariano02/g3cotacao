import React, { Component } from 'react';
import {Products} from './Products';
import logo2 from "./assets/logo2.png"

class App extends Component {
  state = {
    products : [
      { id: 1, name : 'Teclado', price : 30, catagory: '' },
      { id: 2, name : 'Mouse', price : 20, catagory: '' },
      { id: 3, name : 'Mouse pad', price : 7, catagory: ''},
      { id: 4, name : 'Gabinete', price : 50, catagory: ''},
      { id: 5, name : 'Controle sem fio', price : 80, catagory: 'Eletronico', code:'89456465465', barcode: '5465465424198416574894', quantity: '10', description: 'Aumento proximo mês'}
    ]

  }

  deleteProduct = (id) => {
    let products = this.state.products.filter( product => {
      return product.id !== id;
    });
    this.setState({
      products : products
    })
  }
  updateProduct = (product, index) => {
    const state = [...this.state.products];
    let currentProduct = {...state[index]};
    currentProduct = product;
    state[index] = currentProduct;
    this.setState({
      products: state
    });
  }
  render() {
    return (
      <div className="crud-app">
        <header className="app-header">
          <h1 className="app-title"><span><img src={logo2} className="image" alt='G3'/></span>Catálogo de produtos</h1>
        </header>
        <div className="container pt-5">
          <Products products={this.state.products} deleteProduct={ this.deleteProduct } updateProduct={ this.updateProduct} />

        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
class AddProduct extends Component {
  state =
    {
      id: '',
      name: '',
      price: '',
      catagory: '',
      code: '',
      barcode: '',
      description: '',
      quantity: ''

    }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addProduct(this.state);
    this.setState({
      id: '',
      name: '',
      price: '',
      catagory: '',
      code: '',
      barcode: '',
      description: '',
      quantity: ''
    })
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          Adicione um novo produto.
        </div>
        <div className="card-body">
          <form className="form-inline" onSubmit={ this.handleSubmit }>
            <div className="form-group">
              <label>Descrição</label>
              <input type="text" className="form-control ml-sm-2 mr-sm-4 my-2" id="name" onChange={this.handleChange} value={this.state.name} required />
            </div>
            <div className="form-group">
              <label>Valor</label>
              <input type="number" className="form-control ml-sm-2 mr-sm-4 my-2" id="price" onChange={this.handleChange} value={this.state.price} required />
            </div>
            <div className="form-group">
              <label>Embalagem</label>
              <input type="text" className="form-control ml-sm-2 mr-sm-4 my-2" id="catagory" onChange={this.handleChange} value={this.state.catagory} required />
            </div>
            <div className="form-group">
              <label>Código</label>
              <input type="text" className="form-control ml-sm-2 mr-sm-4 my-2" id="code" onChange={this.handleChange} value={this.state.code} required />
            </div>
            <div className="form-group">
              <label>Código de Barra</label>
              <input type="text" className="form-control ml-sm-2 mr-sm-4 my-2" id="barcode" onChange={this.handleChange} value={this.state.barcode} required />
            </div>
            <div className="form-group">
              <label>Observação</label>
              <input type="text" className="form-control ml-sm-2 mr-sm-4 my-2" id="description" onChange={this.handleChange} value={this.state.description} required />
            </div>
            <div className="form-group">
              <label>Quantidade</label>
              <input type="text" className="form-control ml-sm-2 mr-sm-4 my-2" id="quantity" onChange={this.handleChange} value={this.state.quantity} required />
            </div>
            <div className="ml-auto text-right">
              <button type="submit" className="btn btn-dark my-2">Adicionar</button>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddProduct;

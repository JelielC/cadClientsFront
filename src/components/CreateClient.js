import axios from 'axios'
import React, { Component } from 'react'
import api from '../Api'
import InputMask from 'react-input-mask';
//import cep from 'cep-promise'
 
class CreateClient extends Component {
 
  constructor (props) {
    super(props)
    this.state = {
      nome: '',
      idade: '',
      tipo_documento: 'cpf',
      documento: '',
      documento_mask: '999.999.999-99',
      cep: '',
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleCreateClient = this.handleCreateClient.bind(this)
  }
 
  handleFieldChange (event) {
    if (event.target.name == 'tipo_documento'){
      this.changeMask(event.target.value)
    }
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  changeMask(value){
    console.log(value)
    if(value == 'cpf' || !value){
      this.setState({
        documento_mask: '999.999.999-99'
      })
    }
    this.setState({
      documento_mask: '99.999.999/9999-99'
    })
  }
  /*buscarCep(event){
    event.preventDefault()
    //const cepValue = this.state.cep.replace(/-/g, '')
    //cep(cepValue)
    //.then(console.log)
    console.log(this.state.cep)
  }*/
 
  handleCreateClient (event) {
    event.preventDefault()
    const { history } = this.props
    const client = {
      name: this.state.nome,
      idade: this.state.idade,
      tipo_documento: this.state.tipo_documento,
      documento: this.state.documento,
      cep: this.state.cep
    }
 
    axios.post(api.clients, client)
      .then(response => {
        // redirect to the homepage
        history.push('/')
        //console.log('response: ', response)
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }
 
  render () {
    return (
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-12'>
            <div className='card'>
              <div className='card-header'>Create new client</div>
              <div className='card-body'>
                <form onSubmit={this.handleCreateClient}>
                  <div className='form-group'>
                    <label htmlFor='nome'>Nome</label>
                    <input
                      id='nome'
                      type='text'
                      className='form-control'
                      name='nome'
                      value={this.state.nome}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='idade'>Idade</label>
                    <input
                      id='idade'
                      type='text'
                      className='form-control'
                      name='idade'
                      value={this.state.idade}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='tipo_documento'>Tipo Documento</label>
                    <select 
                      id='tipo_documento' 
                      className='form-control' 
                      name='tipo_documento' 
                      value={this.state.tipo_documento} 
                      onChange={this.handleFieldChange}>
                        <option value='cpf'> 
                          CPF
                        </option>
                        <option value='cnpj'> 
                          CNPJ
                        </option>
                    </select>
                  </div>
                  <div className='form-group'>
                    <label htmlFor='documento'>Documento</label>
                    <InputMask
                      mask={this.state.documento_mask}
                      id='documento'
                      type='text'
                      className='form-control'
                      name='documento'
                      value={this.state.documento}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='cep'>CEP</label>
                    <InputMask
                      mask='99999-999'
                      id='cep'
                      type='text'
                      className='form-control'
                      name='cep'
                      value={this.state.cep}
                      onChange={this.handleFieldChange}
                    />
                    {/*<button onClick={this.buscarCep} className='btn btn-primary' type='button'>Buscar Cep</button>*/}
                  </div>
                  <button onClick={ () => this.props.history.goBack()} className='btn btn-default'>Cancelar</button>
                  <button className='btn btn-primary'>Create</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
 
export default CreateClient
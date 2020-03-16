import axios from 'axios'
import React, { Component } from 'react'
import api from '../Api'
import { withRouter } from 'react-router-dom'
 
class UpdateClient extends Component {
 
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      idade: '',
      tipo_documento: 'cpf',
      documento_mask: '999.999.999-99',
      documento: '',
      cep: ''
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
 
  componentDidMount () {
    const clientId = this.props.match.params.id
 
    axios.get(api.clients+`/${clientId}`).then(response => {
      this.setState({
        name: response.data.name,
        idade: response.data.idade,
        tipo_documento: response.data.tipo_documento,
        documento: response.data.documento,
        cep: response.data.cep
      })
    })
  }
 
  handleFieldChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
 
  onSubmit (event) {
    event.preventDefault();
    const { history } = this.props
    const client = {
      name: this.state.name,
      idade: this.state.idade,
      tipo_documento: this.state.tipo_documento,
      documento: this.state.documento,
      cep: this.state.cep
    }
    axios.put(api.clients+'/'+this.props.match.params.id, client)
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
                <form onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
                    <input
                      id='name'
                      type='text'
                      className='form-control'
                      name='name'
                      value={this.state.name}
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
                    <input
                      id='tipo_documento'
                      type='text'
                      className='form-control'
                      name='tipo_documento'
                      value={this.state.tipo_documento}
                      onChange={this.handleFieldChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='documento'>Documento</label>
                    <input
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
                    <input
                      id='cep'
                      type='text'
                      className='form-control'
                      name='cep'
                      value={this.state.cep}
                      onChange={this.handleFieldChange}
                    />
                  </div>               
                  <button onClick={ () => this.props.history.goBack()} className='btn btn-default'>Cancelar</button>
                  <button className='btn btn-primary'>Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
 
export default UpdateClient
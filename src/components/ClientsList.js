import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import api from '../Api'
 
class ClientsList extends Component {
 
    constructor () {
        super()
        // State é onde 'guardamos' as variáveis, os dados da nossa aplicação que sofrerão alterações. É onde basicamente declaramos todas as variáveis do nosso componente
        this.state = {
            clients: []
        }
    }
 
    // componentDidMount - Esse método é chamado imediatamente após a montagem do componente.
    componentDidMount () {
        // Utilizamos agora o axios para requisitar a lista de clientes
        axios.get(api.clients).then(response => {
            this.setState({
                clients: response.data
            })
        })
    }
 
    // Função para deletar um cliente
    deleteContact (clienteId) {
            axios.delete(api.clients+'/'+`${clienteId}`)
            .then(() => {
 
                    // Usamos o GET depois de uma requisição para atualizar a lista
                    return axios.get(api.clients)
            })
            .then(res => {
 
                    // Editando os dados no state
                    const clients = res.data;
                    this.setState({ clients });
            })
    }
 
    render () {
                const { clients } = this.state
                return (
                    <div className="container">
                    <h2>Lista de clientes</h2>
                    <table className="table ">
                            <thead>
                                    <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Idade</th>
                                            <th>CPF/CNPJ</th>
                                            <th>Cep</th>
                                            <th>
                                                <Link 
                                                    className='btn btn-primary btn-xs' 
                                                    to='/create'
                                                >
                                                            Adicionar cliente
                                                    </Link>
                                            </th>
                                    </tr>
                            </thead>
                            <tbody>
                                    {
                                        clients.map((client, index) => (
                                            <tr key={client.id}>
                                                    <td>{client.id}</td>
                                                        <td>{client.name}</td>
                                                            <td>{client.idade}</td>
                                                            <td>{client.documento}</td>
                                                            <td>{client.cep}</td>                               
                                                            <td>
                                                            <Link 
                                                            className='btn btn-default btn-xs' 
                                                            to={`/client/${client.id}`}
                                                        >
                                                            Editar
                                                        </Link>
                                                            <button 
                                                                className="btn btn-danger btn-xs btn-delete"
                                                                onClick={ () => this.deleteContact(client.id) }
                                                            >
                                                                Excluir
                                                            </button>
                                                    </td>
                                            </tr>
                                            ))
                                        }
                                            
                            </tbody>
                    </table>
            </div>
        )
        }
}
 
export default ClientsList
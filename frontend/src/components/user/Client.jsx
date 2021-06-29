import React, {Component} from 'react'
import Main from '../template/Main'
import InputMask from 'react-input-mask'
const axios = require('axios');

const headerProps = {
    icon: 'user',
    title: 'Clientes',
    subtitle: 'Cadastro de clientes'
}

const baseUrl ='http://localhost:3001/clients'
const initialState = {
    user: {name: '', email: '', telefone: '', idade:'', cpf:''},
    list: []
}

export default class Client extends Component {

    state = {...initialState}

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState( {list: resp.data})
        })
    }
    clear() {
        this.setState({ user: initialState.user})
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url,user)
            .then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdateList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id) 
        if(add) list.unshift(user)
        return list 
    }

    updateField(event) {
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    renderForm() {
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome do cliente</label>
                            <input type="text" className="form-control" name="name" value= {this.state.user.name} onChange={e => this.updateField(e)} placeholder="digite o nome do cliente..."></input>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={this.state.user.email} onChange={e => this.updateField(e)} placeholder="digite o email..."></input> 
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Telefone</label>
                            <InputMask type="tel" className="form-control" name="telefone" value={this.state.user.quantidade} onChange={e => this.updateField(e)} placeholder="digite o telefone.." mask="(99) 99999-9999"></InputMask> 
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Idade</label>
                            <InputMask type="text" className="form-control" name="idade" value={this.state.user.quantidade} onChange={e => this.updateField(e)} placeholder="digite a idade.." mask="99/99/99"></InputMask> 
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CPF</label>
                            <InputMask type="text" className="form-control" name="cpf" value={this.state.user.quantidade} onChange={e => this.updateField(e)} placeholder="digite o cpf.." mask="999.999.999-99"></InputMask> 
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                        onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2" 
                        onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user) {
        this.setState({user})

    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdateList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>idade</th>
                        <th>CPF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return(
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.telefone}</td>
                    <td>{user.idade}</td>
                    <td>{user.cpf}</td>
                    <td>
                        <button className="btn btn-warning" 
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>

            )
        })
    }
    render() {
        console.log(this.state.list)
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
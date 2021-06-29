import './Nav.css'
import React from 'react'

export default props => 
    <aside className="menu-area">
        <nav className="menu">
            <a href="#/">
                <i className="fa fa-home"></i>Inicio
            </a>
            <a href="#/users">
                <i className="fa fa-database"></i> Controle de vendas
            </a>
            <a href="#/clients">
                <i className="fa fa-user"></i> Clientes
            </a>
            
        </nav>
    </aside>

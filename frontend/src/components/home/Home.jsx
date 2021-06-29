import React from 'react'
import Main from '../template/Main'
import logo from '../../assets/imgs/image3721.png'
import './Home.css'
export default props => 
<Main icon="home" title="Inicio"
subtitle="Loja virtual multimarcas">
    <div className="display-4">Bem vindo(a) <a href="https://www.instagram.com/leoblack_caps/">
                <i className="fa fa-instagram"></i>Leoblack_caps
            </a> </div>
    <hr />
    <p className="mb-0">Somos uma loja de roupa virtual que se deu o inicio devido a pandemia, trabalhamos com multimarcas de bonés, roupas e outros acessorios de primeira linha!</p>
    <a href="/" className="logo">
    <img src={logo} alt="logo" />
    </a>
    </Main> 
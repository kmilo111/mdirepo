import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Evento from './initial/Evento.js';
import TipoEvento from './initial/TipoEvento.js';
import GrupoEvento  from './initial/GrupoEvento.js';
import Product from './initial/Product.js';
import logo from './assets/images/mdi.jpg';
import './App.css';

const Header = () =>{
  return (
     <div className="header"></div>
   )
}

const NavMenu =() =>{
  return (
     <ul className="navbar-nav mr-auto">
       <li className="nav-item">
        <i className="fa fa-home eventsC3"></i>
        <Link to="/" className="nav-link">Home</Link>
       </li>
       <li className="nav-item">
       <i className="fa fa-calendar eventsC1"></i>
        <Link to="/" className="nav-link">Tipos de Eventos</Link>
       </li>
       <li className="nav-item">
       <i className="fa fa-calendar-plus-o eventsC2"></i>
        <Link to="/evento" className="nav-link">Evento</Link>
       </li>
       <li className="nav-item">
       <i className="fa fa-calendar-o eventsC4"></i>
        <Link to="/grupo-evento" className="nav-link">Grupo de evento</Link>
       </li>
       <li className="nav-item">
          <i className="fa fa-product-hunt" aria-hidden="true"></i>
          <Link to="/registrar-producto" className="nav-link">Registrar Producto</Link>
       </li>
     </ul>
  )
}

const LeftHeader = () =>{
    return(
      <div className="LeftBar">
        <div className="lineHeader"></div>
         <div className="logo">
           <img src={logo} alt="Mercadeo Deportivo Integral" />
         </div>
         <div className="NavMenu">
          <NavMenu/>
        </div>
         <Footer />
      </div>
    )
}

const App = () => {
    return (
      <Router>
      <div className="mainContent"> 
        <LeftHeader />
        <Header /> 
        <Route exact path="/" component={TipoEvento} />
        <Route path="/evento" component={Evento} />
        <Route path="/grupo-evento" component={GrupoEvento} />
        <Route path="/registrar-producto" component={Product} />
        <div className="lineFooter"></div>
      </div>
      </Router>
    );
}

const Footer = () =>{
  return(
    <div className="footer">BlackSip &copy; 2018</div>
  );
}

export default App;

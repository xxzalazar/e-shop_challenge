import React, {useState} from 'react'
import '../styles/header.css'
import "../styles/itemCart.css"
import "../styles/mediaQuerys/mediaHeader.css"
import "../styles/mediaQuerys/mediaCart.css"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTag, faUser, faWindowClose} from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import usersActions from "../redux/actions/usersActions";
import ItemCart from './ItemCart'
import productsActions from '../redux/actions/productsActions'

class Header extends React.Component {

    state = {
        tooltipOpen: false,
        open: "0",
       
        products: this.props.cartProducts
    }

    componentDidMount(){
        if (this.props.cartProducts.length === 0 && localStorage.getItem('cart')){
            this.props.forceCart()
        }
        
    }

    componentDidUpdate(prevProps) {
        if (this.props.countTotal !== prevProps.countTotal) {
            this.setState({
                ...this.state,
                product:this.props.products
            })
        }
    }
      

    toggle = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        })
    }

   
    closeNav = () => {
        this.setState({
            open: '0',
            opacity: ''
        })
    }

    openNav = () => {
        this.setState({
            open: '50%',
            opacity: 'rgba(0,0,0,0.3)'
        })
        if (this.state.open === '50%') {
            this.setState({
                open: '0vw',
            })    
        }
    }
    
    render() {

        const backCart = require('../images/fondo-carrito2.jpg')

        var subtotal = 0
        
        this.props.cartProducts.map(item =>{
            subtotal += (item.product.price * item.quantity)
        })       

        const style = {
            width: this.state.open,
            backgroundSize: 'cover',
        }



        
        return (
            <>
            {<div className="header-sup">
                    <h5 className="titleHeader">Felices las vacas | Alimentación conciente</h5>
                    <button onClick={this.openNav} className="cartCircle" ><FontAwesomeIcon className="carrito" icon={faShoppingCart} /></button>
                   { <div className="sidepanel" style={style}>
                        <div className="headerPanel">
                            <p>CARRITO DE COMPRAS</p>
                            <button onClick={this.closeNav} className="closebtn"><FontAwesomeIcon className="WindowClose" style={{color: '#fff'}} icon={faWindowClose} /></button>
                        </div>
                        
                        {this.props.cartProducts.length === 0 ?
                        <div className="containeritemsCart">
                        <h1>El carrito esta vacio <b onClick={this.openNav} style={{fontSize: '15px'}}><NavLink style={{color: '#fff'}} to='/productos'>ver productos</NavLink></b></h1>
                        </div>
                        :
                        <>
                         <div className="containeritemsCart">
                        {this.props.cartProducts.map(product =>{
                            return <ItemCart product = {product} />
                        })}
                        </div>
                        <div>
                            <div className="footCart">
                                <p><b>Total:</b></p>
                                <p><b>${this.props.countTotal}</b></p>
                            </div>
                            <div className="footCart-buy">
                                <NavLink style={{color: '#fff'}} to='/productos'>Ver más productos</NavLink>
                                <Button><NavLink to="/comprar" style={{color:"whitesmoke"}}>Iniciar Compra <FontAwesomeIcon icon={faTag} /></NavLink></Button>
                            </div>
                        </div>
                        </>
                        
                        }
                    </div>}
            </div>}
            
           
            <div className="navbar">
                <div className="div"></div>
                <NavLink to='/'>Inicio</NavLink>
                <NavLink to='/productos'>Productos</NavLink>
                <NavLink to='/faqs'>Guía de compra</NavLink>
                <MenuDesplegable userLogued={this.props} />
                <div className="div"></div>
            </div>          
            </>
        )
    }
}

const mapStateToProps = (state) => {
    
    var countTotal = 0
        state.productsRed.cartProducts.map(product =>{
        countTotal += (parseInt(product.quantity) * parseInt(product.product.price))
    })
    return {
      username: state.usersRed.username,
      token: state.usersRed.token,
      cartProducts: state.productsRed.cartProducts,
      countTotal
    };
  };
  
  const mapDispatchToProps = {
    forcedLogIn: usersActions.forcedLogIn,
    forceCart: productsActions.forcedCart
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Header);



const MenuDesplegable = (props) => {
    
    const [dropdownOpen, setDropdownOpen] = useState(false)
  
    const toggle = () => setDropdownOpen(prevState => !prevState)
    

    return (
        <>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className="desplegable"><FontAwesomeIcon icon={faUser} /> {props.userLogued.token ? `${props.userLogued.username}` : 'Cuenta'}</DropdownToggle>
                <DropdownMenu>
                    {props.userLogued.token ?   
                        (
                            <>
                                <DropdownItem><NavLink to='/profile' style={{width: '100%'}}>Mi cuenta</NavLink></DropdownItem>
                                <DropdownItem><NavLink to="/log-out">Cerrar sesión</NavLink></DropdownItem>
                            </>
                        )
                        :   
                        (
                            <>
                                <DropdownItem><NavLink to='/sign-in' style={{width: '100%'}} name="iniciar-sesion">Iniciar sesión</NavLink></DropdownItem>
                                <DropdownItem><NavLink to='/sign-up' style={{width: '100%'}}>Crear cuenta</NavLink></DropdownItem>
                            </>
                        )
                    }
                </DropdownMenu>
            </Dropdown>
        </>
    )
}


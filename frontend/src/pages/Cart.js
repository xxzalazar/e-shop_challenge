import React from 'react'
import '../styles/header.css'

class Cart extends React.Component {

    state = {
        open: "0",
        width: "100vw",
        height: "100vh",
        opacity: "",
        position: "fixed"
    }

    closeNav = () => {
        this.setState({
            open: '0',
            opacity: ''
        })
    }

    openNav = () => {
        this.setState({
            open: '400px',
            opacity: 'rgba(0,0,0,0.3)'
        })
    }

    render() {

        const style = {
            width: this.state.open
        }

        const body = {
            width: this.state.width,
            height: this.state.height,
            backgroundColor: this.state.opacity,
            position: this.state.position,
        }

        return (
            <>
            <div className="header-sup">
                <button onClick={this.openNav} className="openbtn" ><i class="fas fa-shopping-cart"></i></button>
                <div className="sidepanel" style={style}>
                    <button onClick={this.closeNav} className="closebtn">x</button>
                    <h4>Tu carrito esta vacío :(</h4>
                </div>
            </div>
            <div style={body}>
            </div>
            </>
        )
    }
}

export default Cart
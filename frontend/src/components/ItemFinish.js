import React from 'react'
import { connect } from 'react-redux'
import '../styles/finishShopping.css'
import "../styles/itemCart.css"


class ItemFinish extends React.Component{
    state={
        product : this.props.item.product,
        quantity:this.props.item.quantity
    }

    componentDidMount(){
        // console.log(this.props)
    }
    
    render(){
        return (
        <>
        <div className= "containerStract">
            <div><img src={this.state.product.photo}></img></div>
            <div className="stract">
                <h3>{this.state.product.name}</h3>
                <p>Unidades seleccionadas: {this.state.quantity}</p>
                <p>Subtotal: ${this.state.product.price * this.state.quantity}</p>
            </div>
        </div>
        </>
        )
    }
}



export default ItemFinish
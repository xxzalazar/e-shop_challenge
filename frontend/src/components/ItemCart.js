import React from 'react'
import { connect } from 'react-redux'
import productsActions from '../redux/actions/productsActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlus, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Tooltip } from 'reactstrap'
import "../styles/itemCart.css"
import "../styles/mediaQuerys/mediaCart.css"


class ItemCart extends React.Component{
    state={
        product : this.props.product.product,
        quantity:this.props.product.quantity,
        tooltipOpen: false
    }

    toggle = () => {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        })
    }

    addOne = (idProduct) =>{
        var quan = this.state.quantity
        this.setState({
            ...this.state,
            quantity: quan+1
        })
        this.props.addProduct(idProduct)
    }

    removeOne = (idProduct) =>{
        var quan = this.state.quantity
        this.setState({ loading: true })
        if (quan === 0){
            this.setState({
                ...this.state,
                quantity: 0
            }) 
        }else{
        this.setState({
            ...this.state,
            quantity: quan-1
        })
        this.props.removeProduct(idProduct)
        }
        this.setState({ loading: false })
        
    }

    delete = (idProduct) =>{
        this.props.deleteProduct(idProduct)
    }

    render(){

        return (
        <>
        <div className= "containerItemCart">
            <div style={{height: '70%'}}><img src={this.state.product.photo}></img></div>
            <div className="texto">
                <h3>{this.state.product.name}</h3>
                <p>$ {this.state.product.price}</p>
                <div className="counterContainer">
                    <p>Unidades<b>:</b> </p>
                    <div className="counter">
                        <button className="downup" onClick={() => this.removeOne(this.state.product._id)}><FontAwesomeIcon icon={faMinusCircle} /></button>
                        <div className="quantity" style={{ width: '20px', fontSize:"20px", textAlign: 'center'}}>{ this.state.quantity }</div>
                        <button className="downup" onClick={() => this.addOne(this.state.product._id)}><FontAwesomeIcon icon={faPlusCircle} /></button>
                    </div>
                </div>
            </div>
        </div>
        <div className="subtotal">
            <div>
                <p style={{color: 'white'}}>Subtotal: <b>$ {this.state.product.price * this.state.quantity}</b></p>
            </div>
            <div>
                <span href="#" id="TooltipExample">
                    <button className="trash" style={{border: 'none', background: 'none'}} onClick={() => this.delete(this.state.product._id)}>
                        <FontAwesomeIcon style={{color: 'white', fontSize: '20px'}} icon={faTrashAlt} />
                    </button>
                </span>
                <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggle}>
                    Eliminar compra
                </Tooltip>
            </div>
        </div>
        </>
        )
    }
}

const mapDispatchToProps = {
    addProduct: productsActions.addProducts,
    removeProduct: productsActions.removeProducts,
    deleteProduct: productsActions.deleteProducts
}

export default connect(null, mapDispatchToProps)(ItemCart)
import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import productsActions from "../redux/actions/productsActions";
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import "../styles/itemCard.css";
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

toast.configure()
const ItemCard = (props) => {
  const [quantity, setQuantity] = useState(0);


    const changeInput = (e) =>{
      e.preventDefault()  
      if (e.target.value === "up"){
        setQuantity(quantity+1)
      }else{
        setQuantity(quantity-1)
        if (quantity <= 0){
          setQuantity(0)
        }
      }
    }
  

  const addItem = (e) => {
    e.preventDefault();
    if (quantity > props.item.stock) {
      toast.warning("💩 NO DISPONEMOS DE LA CANTIDAD SOLICITADA EN STOCK", {position: toast.POSITION.TOP_CENTER})
    } else {
      if (quantity !== 0) {
        props.addToCart(props.item, quantity);
        toast.success(`🐮 ${quantity} ITEM(S) AÑADIDO(S) AL CARRITO`, {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000})
      }
    }
    setQuantity(0)
  };

  return (
    <Card className="cardProducts" style={{ margin: "2vw" }}>
      <NavLink className="viewMore-navLink" to={`/producto/${props.item._id}`}>
        <CardImg top width="100%" src={props.item.photo} />
        <CardBody className="card-body-item">

          <div className='mainCard'>
            <CardTitle className="cardTitle">{props.item.name}</CardTitle>
            <CardSubtitle className="cardSubTitle">
              ${props.item.price}
            </CardSubtitle>
          </div>

          <div
            className="allCardInputs"
          >
            <div className="masomenos">
              <button className="moreLess" value="down" onClick={changeInput}>
                -
              </button>
              <input
                value={quantity}
                type="number"
                className="imputNumber"
              ></input>

              <button className="moreLess" value="up" onClick={changeInput}>
                +
              </button>
            </div>

            <button className="addToCart" onClick={addItem}>
              Añadir al carrito
            </button>
          </div>
        </CardBody>
      </NavLink>
    </Card>
  );
};

const mapDispatchToProps = {
  addToCart: productsActions.addToCart,
};
const mapStateToProps = (state) => {

return{
  state
}
}
export default connect(mapStateToProps,mapDispatchToProps) (ItemCard);

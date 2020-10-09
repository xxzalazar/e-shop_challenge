import React, {useState,useEffect} from 'react';
import Header from './Header'
import Footer from './Footer'
import { connect } from 'react-redux';
import productsActions from '../redux/actions/productsActions'
import { toast } from "react-toastify"
import { NavLink } from 'react-router-dom';
import '../styles/item.css'

const Item = (props) => {
    const [item, setItem] = useState({})
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
    if (quantity > item.stock) {
      toast.warning("💩 NO DISPONEMOS DE LA CANTIDAD SOLICITADA EN STOCK", {position: toast.POSITION.TOP_CENTER})
    } else {
      if (quantity !== 0) {
        props.addToCart(item, quantity);
        toast.success(`🐮 ${quantity} ITEM(S) AÑADIDO(S) AL CARRITO`, {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 3000})
      }
    }
    setQuantity(0)
  };
    useEffect( () => {
      const getProduct = async () =>{
        var idProduct = props.match.params.id
        const res = await props.getProduct(idProduct)
        setItem(res)
      }
      getProduct()
	  }, [])
    return (
    <>
      <Header />
      <div
        style={{ display: "flex", flexDirection: "column", marginLeft: "5%" }}
      >
        <div>
          <h5 style={{color:"#048f55"}}>inicio | productos | {item.name}</h5>
        </div>
        <div style={{ display: "flex", marginLeft: "5%", alignItems:"center" }}>
          <div style={{display:"flex"}}>
            <div >
              <img
                style={{ width: "25vw", margin: "3%" }}
                src={item.photo}
              ></img>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "4%",
              width: "40vw",
            }}
          >
            <h2 style={{color:"#048f55"}}>{item.name}</h2>
            <p>{item.description}</p>
            <div >
            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
                <img style={{ width: "30vw", height:"30vh" }} src={item.photo1}></img>
                <div className="allCardInputs1">
                  <div className="masomenos1">
                      <button className="moreLess1" value="down" onClick={changeInput}>
                        -
                      </button>
                      <input
                        value={quantity}
                        type="number"
                        className="imputNumber"
                      ></input>

                      <button className="moreLess1" value="up" onClick={changeInput}>
                        +
                      </button>
                  </div>

                  <button className="addToCart1" onClick={addItem}>
                    Añadir al carrito
                  </button>
                </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const mapDispatchToProps = {
  getProduct: productsActions.getProductById,
  addToCart: productsActions.addToCart,
};

export default connect(null, mapDispatchToProps)(Item);

import React from 'react'
import {NavLink} from 'react-router-dom'
import '../styles/account.css'
import '../styles/mediaQuerys/mediaAccount.css'

const GoSignIn = () => {

    const hamburguesa = require('../images/hamburguesa_aplastada.jpg')
    const dulceDeLeche = require('../images/dulce_de_leche.jpg')

    return (
        <>
            <div className="back-logIn" style={{minHeight: '50vh'}}>
                <div className="RightBack-logIn" style={{backgroundImage: `url(${hamburguesa})`}}>
                </div>
                <div className="alfajores" style={{ backgroundImage: `url(${dulceDeLeche})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                    <div className="cardInputs-signUp" style={{marginTop: '10vh'}}>
                        <h3 className="titleHouses">Para continuar con su compra inicie sesión</h3>
                        <div className="signContainer">
                            <button className="send"><NavLink style={{color: 'white'}} to="/sign-in">Iniciar sesion</NavLink></button>
                            <button className="send"><NavLink style={{color: 'white'}} to="/sign-up" >Crear cuenta</NavLink></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GoSignIn

import React, {Image} from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/thanks.css'

class Thanks extends React.Component {

    render() {
        const logo = require('../images/logo.png')
        const gracias =require('../images/gracias3.gif')
        const gracias2 =require('../images/gracias2.gif')
        return (
            <>
                <Header />
                <div className="containerTotal">
                <div className="containerGif">
                    <img className="photo1" src={gracias} />
                </div>
                <div className="containerThanksText">
                    <h1>Muchas Gracias por tu compra</h1>
                    <img src={logo} />
                    <p>La misma llegará en 5 diás habiles a tu domicilio</p>
                    <p>En tu casilla de email encontrás un correo con el resumen de la compra.</p>
                    <p>Si seleccionaste efectivo la podras abonarás al momento de recibirla.</p>
                    <p>Gracias por cuidar el ambiente y a los animales, ellas están felices.</p>
                    <p>Por cualquier consulta comunicarse a: feliceslasvacas@gmail.com.</p>
                </div>
                <div className="containerGif">
                    <img className="photo1" src={gracias2} />
                </div>
                </div>
                <Footer />
            </>
        )
    }
}

export default Thanks
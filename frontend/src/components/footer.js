import React from 'react'
import '../styles/home.css'
import '../styles/mediaQuerys/mediaFooter.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

class Footer extends React.Component {

    render() {

        return (
            <>
            <div className="footer">
                <div className="left-footer">
                    <h4>NAVEGACIÓN</h4>
                    <ul>
                        <li><NavLink to="/"><p>Página inicio</p></NavLink></li>
                        <li><NavLink to="/como-comprar"><p>Como comprar</p></NavLink></li>
                        <li><NavLink to="/productos"><p>Productos</p></NavLink></li>
                        <li><a ><p>Contacto</p></a></li>
                    </ul>
                </div>
                <div className="center-footer">
                    <h4>CONTÁCTENOS</h4>
                    <div className="contact">
                        <ul>
                            <li><p><a ><FontAwesomeIcon icon={faPhone} /> 1162938576</a></p></li>
                            <li><a href="mailto:feliceslasvacas@gmail.com"><FontAwesomeIcon icon={faEnvelope} /> feliceslasvacas@gmail.com</a></li>
                        </ul>
                    </div>
                </div> 
                <div className="right-footer">
                    <h4>ENCUENTRANOS</h4>
                    <div>
                        <iframe className="mapFooter" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.444932348751!2d-58.40114508505275!3d-34.59290896443272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca975dab9527%3A0xfc10d81c740a4a6e!2sAzcu%C3%A9naga%201301-1399%2C%20C1115AAK%20CABA!5e0!3m2!1ses!2sar!4v1600904958664!5m2!1ses!2sar" width="400" height="175" frameborder="0" style={{border: '0'}} allowfullscreen="" aria-hidden="false" tabIndex="0"></iframe>
                    </div>
                    <a ></a>
                    <a ></a>
                </div>
            </div>
            <div className="underFooter">
                <p className="create">creado por WhiteTeam</p>
                <p>COPYRIGHT FELICESLASVACAS - 2020. TODOS LOS DERECHOS RESERVADOS.</p>
            </div>
            </>
        )
    }
}

export default Footer
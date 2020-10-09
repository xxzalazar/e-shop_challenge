import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faServer, faKissWinkHeart } from '@fortawesome/free-solid-svg-icons'
import FormAdmin from '../components/FormAdmin'
import EditAdmin from '../components/EditAdmin'
import Footer from '../components/Footer'
import HeaderAdmin from '../components/HeaderAdmin'

const HomeAdmin = () => {

    const [bodyEdit, setBodyEdit] = useState('')
    
    const styleContainer = {
        
        padding: "3%",
        marginTop: "3%",
        marginBottom: "3%",
        borderRadius: "0.5rem",
        backgroundPosition:"center center",
        }

    const switchBody = (aBody) => {
        setBodyEdit(aBody)
    }

    return (
        <>
            <HeaderAdmin/>
            <div  style={styleContainer} className='container'>
                <h1 style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "black",
                    fontSize: '8vw',
                    fontFamily:"'Dancing Script', cursive"
                }}>Bienvenido</h1>
                <h5 style={{
                    display: "flex",
                    justifyContent: "center",
                    color: "black",
                    fontSize: '2vw',
                    fontFamily: "'Open Sans Condensed', sans-serif"
                }}>panel de administración</h5>
            </div>

            <div  className="container">
                <div className="row d-flex mb-3">
                    <div className=" d-flex col-md-6 p-2">
                        <button onClick={() => switchBody('Añadir')} className="btn btn-success btn-lg btn-block"><FontAwesomeIcon icon={faServer}></FontAwesomeIcon> Agregar Producto</button>
                    </div>
                    <div className="col-md-6 p-2">
                        <button onClick={() => switchBody('Editar')} className="btn btn-success btn-lg btn-block"><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> Editar Producto</button>
                    </div>
                </div>
                {(bodyEdit === 'Añadir') && <FormAdmin/>}
                {(bodyEdit === 'Editar') && <EditAdmin/>}
                {(bodyEdit === '') && 
                <>
                    <div className="col-md-12">
                        <div className="profile-img" style={{
                            margin:"7% 38%"
                            
                        }}>
                            <img style={{height:"20vw"}} src="https://scontent.faep4-1.fna.fbcdn.net/v/t1.0-9/116526230_3358036327581589_4397387291706823192_o.jpg?_nc_cat=106&_nc_sid=09cbfe&_nc_ohc=wIz_IbmdvX0AX_l2prG&_nc_ht=scontent.faep4-1.fna&oh=e8efcc57f25f1fd6521db14a9908d0b1&oe=5FA24828"></img>
                            
                        </div>
                    </div>
                </>}
            </div>
            <Footer/>
        </>
    )
}

export default HomeAdmin
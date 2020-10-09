import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.css'

const HeaderAdmin = () => {
    return (
        <>
            <div className='d-flex justify-content-between header-sup'>
                <h5 className="titleHeader" style={{marginLeft:"3%"}} >Felices las vacas | Alimentación conciente</h5>
                <button style={{ marginRight:"3%", border:"none", backgroundColor:"#3bc45b"}} ><Link style={{color: 'white', fontWeight:"bold"}} to='/log-out'>Salir</Link></button>
            </div>
        </>
    )
}

export default HeaderAdmin
import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Swal from "sweetalert2"
import Header from './Header'
import Footer from './Footer';


const Profile = (props) => {
    const[load, setLoad]= useState(true)
    const[userData, setUserData]=useState({})
    const[provinces, setProvinces]=useState([])

    useEffect(()=>{
       data()
    },[props.username])

    const data = async () => {
        const response = await axios.get(`http://127.0.0.1:4000/api/userInfo/${props.username}`)
        setUserData(response.data.userInfo)
        const provinceData = await axios.get("https://countriesfeliceslasvacasapi.herokuapp.com/api/prov")
        setProvinces(provinceData.data)
    }

    const showProfile =()=>{
        return(
        <>
            <div>
                <h3>Tus datos</h3>
                <div style={{
                    marginLeft: '5vw',
                    borderLeft:"solix 1px gray"
                }}>
                    <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>Nombre:</h6> {userData.name}.</p>
                    <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>Apellido: </h6> {userData.surname}.</p>
                    <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>DNI:</h6> {!userData.DNI ? "Actualice los datos": userData.DNI}.</p>
                </div>
                <h4>Dirección de envio (importante)</h4>
                <div style={{
                    marginLeft: '5vw',
                    borderLeft:"solix 1px gray"
                }}>
                    <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>País: </h6> Argentina.</p>
                    <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>Provincia: </h6> {!userData.province ? "Actualice los datos" : userData.province}.</p>
                    <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>Ciudad: </h6> {!userData.city ? "Actualice los datos": userData.city}.</p>
                    <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>Dirección: </h6> {!userData.address ? "Actualice los datos": userData.address}.</p>
                </div>
            </div>
        </>)
    }
    
    const inputHandler=(e)=>{
        const value=e.target.value
        const campo= e.target.name
        setUserData({
            ...userData,
			[campo]: value
        })
    }
    
    const toEdit= async(userData)=>{
        const response = await axios.put("http://127.0.0.1:4000/api/editUser",userData,{
            headers: {
                Authorization: `Bearer ${props.token}`
          }})
        if(response.success){
            return 
        }
    }

    const confirmData =  () => {
        (userData.address === null || userData.city === null || userData.province === null) 
        ?  Swal.fire({  
            title: 'Direccion no completa!!!',  
            text: `Se necesita la dirección completa para el envío (Provincia/Ciudad/Direccion)`,  
            imageUrl: 'https://sdl-stickershop.line.naver.jp/products/0/0/1/1137640/android/stickers/5615088.png',
            showConfirmButton: true, 
            timer: false,
            allowOutsideClick: false,
            footer: 'Una vaquita te lo agradecerá',
        })
        :  Swal.fire({  
            title: 'Muchas gracias por completar tu dirección!!',  
            text: `Ahora puedes confirmar la compra`,  
            imageUrl: 'https://sdl-stickershop.line.naver.jp/products/0/0/1/1137640/android/stickers/5615093.png',
            showConfirmButton: true, 
            timer: false,
            allowOutsideClick: false,
            footer: 'Una vaquita te lo agradece',
        })
    }    

    const submit = async (e) => {
        e.preventDefault();
        await toEdit(userData)
        setLoad(!load)
        confirmData()
    }

    const tortilla = require('../images/tortilla.jpg')


    return (
        <div>
            <div style={{
                backgroundImage: `url(${tortilla})`,
                width: 'auto',
                height: 'auto',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                padding: '2vh'
            }}>
                <div class="container" >
                    <div style={{
                        display:"flex", 
                        flexDirection:"column", 
                        justifyContent:"space-between",
                        border: '1px solid #000',
                        background: 'rgba(0,0,0,0.5)',
                        borderRadius: '20px',
                        position: 'relative',
                        padding: '2vh',
                    }}>
                        <div style={{marginLeft:"10%"}}>
                            {load? showProfile(): editProfile(inputHandler,submit, userData, provinces)}
                            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                            <button style={{
                                border:"none", 
                                color: 'white',
                                backgroundColor: '#4CAF50',
                                border: 'none',
                                padding: '5px',
                                textAlign: 'center',
                                textDecoration: 'none',
                                margin: '10px 0',
                                borderRadius: '4px',
                            }} onClick={()=> setLoad(!load)}>{load? "editar": "cancelar"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

const editProfile = (inputHandler, submit, userData, provinces) =>{

    const input = {
        height: '42px',
        color: 'rgba(44, 62, 80, 0.8)',
        backgroundColor: '#fff',
        border: '1px solid #3bc45b',
        width: '100%',
        padding: '6px 12px',
        lineHeight: '1px',
        fontSize: '14px',
        borderRadius: '4px',
    }

    return(
        <>
            <div style={{display:"flex", flexDirection:"column", marginRight:"10%" }}>
                <label>Nombre: </label>
                <input style={input} type='text' name='name' value={userData.name ? userData.name : "" }  onChange={inputHandler} />
                <label>Apellido:</label>
                <input style={input} type='text' name='surname' value={userData.surname ? userData.surname :"" } onChange={inputHandler} />
                <label>DNI: </label>
                <input style={input} type='text' name='DNI' value={userData.DNI ? userData.DNI :"" } onChange={inputHandler} />
                <label>Provincia:</label>
                <select name='province' onChange={inputHandler}>
                    {provinces.map((province, index)=>
                        <option key={index} value={province} >{province}</option>
                    )}
                </select>
                <label>Ciudad:</label>
                <input style={input} type='text' name='city' value={userData.city ? userData.city :"" } onChange={inputHandler} />
                <label>Dirección:</label>
                <input style={input} type='text' name='address' value={userData.address ? userData.address :"" } onChange={inputHandler} />
            <div style={{margin:"2% 4% 0% 0%", }}><button style={{borderRadius:"25px",backgroundColor:"green", color:"white",padding:"1% 1.4%", border:"none" }} onClick={(submit)}>send</button></div>
            </div>
        </>
    )
}


const mapStateToProps = (state) =>{
    return{
        token: state.usersRed.token,
        username: state.usersRed.username
    }
}

export default connect(mapStateToProps, null)(Profile)
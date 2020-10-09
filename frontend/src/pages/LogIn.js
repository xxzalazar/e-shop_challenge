
import Header from '../components/Header'
import React from 'react'
import usersActions from '../redux/actions/usersActions'
import {connect} from 'react-redux'
import GoogleLogin from 'react-google-login';
import Swal from 'sweetalert2'
import Footer from '../components/Footer';
import { NavLink } from 'react-router-dom';
import '../styles/account.css'
import { motion } from 'framer-motion'


class SignIn extends React.Component{
    state={
        logUser:{
            username:"",
            password:"",    
        },
        error:""
    }
    getForm = e =>{
        e.preventDefault()
       
        this.setState({
            logUser:{
                ...this.state.logUser,
                [e.target.name]: e.target.value
            }
        })
    }


    submit =  async e => {
 
        e.preventDefault()
        if (this.state.logUser.username ==="" || this.state.logUser.password === "" ){
            this.setState({
                error: "Ambos campos son obligatorios"
            }) 
        }else{
            const logUser= {username:this.state.logUser.username , password: this.state.logUser.password}
            const response =  await this.props.logUser(logUser)
            
            if (response.success === true){
                
            }else{
                this.setState({
                    error: response
                })    
            }
        }
    }

    responseGoogle = async (response) =>{
        this.setState({
            ...this.state,
            logUser:{
                username:response.profileObj.email,
                password:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, "")+response.profileObj.familyName.trim().charAt(0).toUpperCase() + response.profileObj.familyName.trim().charAt(0).toLowerCase()
            }
        })
        const res = await this.props.getUser(this.state.logUser)
        
        if(res === true){
            const resp =  await this.props.logUser(this.state.logUser)
            
            
        }else{
            Swal.fire({  
                title: 'Debes registrarte primero!',  
                text: `Porfavor ve a crear cuenta, ${response.profileObj.givenName}.`,  
                imageUrl: 'https://sdl-stickershop.line.naver.jp/products/0/0/1/1137640/android/stickers/5615102.png',
                    imageAlt: 'Bienvenida de la vaca triste',  
                showConfirmButton: false, 
                timer: 2000,
                allowOutsideClick: false
            })
        }
        this.setState({
            ...this.state,
            logUser:{
                username:"",
                password:""
            }
        })    
    }

    
    render(){

        const tortilla = require('../images/tortilla.jpg')
        const pizza = require('../images/pizza.jpg')

        return (
            <>
            <Header />
            <div className="back-logIn">
                <div className="RightBack-logIn" style={{backgroundImage: `url(${tortilla})`}}>
                </div>
                
                <div className="pizza" style={{ backgroundImage: `url(${pizza})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                    <div className="cardInputs-logIn">
                        <h3 className="titleHouses">Entrá a tu cuenta</h3>
                        <div className="signContainer-login">
                            <div className="inputs">
                                <span className = {this.state.error === "" ? "" : "logError"}>{this.state.error}</span>
                                <input className="account" name="username" type="text" placeholder="Escriba su nombre de usuario" autocomplete="off" onChange={this.getForm} />
                                <input className="password" type="password" name="password" placeholder="Escriba su contraseña" autocomplete="off" onChange={this.getForm} />
                            </div>
                            <button onClick={this.submit} className="send"><span> Iniciar sesión</span></button>
                            <NavLink to="/forgotPass" style={{fontSize:"1.4rem", color: 'white'}}>Olvidé mi contraseña</NavLink>
                            <p className="or" style={{marginTop: '1.5vh'}}>Ó</p>
                            <GoogleLogin
                                className="googleBtn"
                                clientId="204753879301-qflivfpgiqk2v57hne24iu8j2acnmimn.apps.googleusercontent.com"
                                buttonText="Inicia sesión con Google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                            />
                                <p style={{marginTop: '5vh', color: 'white', textAlign: 'center'}}>Si todavía no tienes una cuenta, <NavLink style={{color: 'white'}} to='/sign-up'>regístrate aquí.</NavLink></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            </>
        )
    }
}

const mapDispatchToProps = {
    logUser: usersActions.logUser,
    getUser: usersActions.getUser
}

const mapStateToProps = (state)=>{
    return{
        userLog: state.usersRed
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

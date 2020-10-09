
import Header from '../components/Header'
import React from 'react'
import {connect} from 'react-redux'
import usersActions from '../redux/actions/usersActions'
import Swal from 'sweetalert2'
import GoogleLogin from 'react-google-login';
import Footer from '../components/Footer'
import '../styles/account.css'
import '../styles/mediaQuerys/mediaAccount.css'
import { NavLink } from 'react-router-dom'
import { Progress } from 'reactstrap';



class SignUp extends React.Component{
    
    state={
        newUser:{
            username:"",
            password:"",
            name:"",
            surname:"",
            mail:"",
            passwordValidation: "",
            role:"",
            loginGoogle:"false"
        },
        errors:{
            username:"",
            password:"",
            name:"",
            surname:"",
            mail:"",
            passwordValidation: ""
        }, 
        load: {
            value: 0
        }
    }
    
    getForm = async e =>{
        const property = e.target.name
        const value = e.target.value
        await this.setState({
            newUser:{
                ...this.state.newUser,
                [property]: value
            }
        })
    }

    progres = value => {
        this.setState({
            load: {
                ...this.state.load,
                value: this.state.load.value + value
            }
        })
    }

    submit = async e =>{
        
        const errors = this.state.errors
        
        const validEmailRegex = RegExp( 	
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        const validPassword = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}/)

        errors.username =
            this.state.newUser.username.length < 2
            ? "El nombre de usuario debe tener al menos 2 caracteres"
            : ""
        errors.passwordValidation =
            this.state.newUser.password !== this.state.newUser.passwordValidation
            ? "Las contraseñas no concuerdan"
            : ""
        errors.password = 
            validPassword.test(this.state.newUser.password)
            ?""
            :"La contraseña debe tener al menos 6 caracteres y debe incluir una letra mayúscula, una letra minúscula y un dígito numérico"
        errors.name =
            this.state.newUser.name.length < 2
            ? "El nombre debe tener al menos 2 caracteres"
            : ""
        errors.surname =
            this.state.newUser.surname.length < 2
            ? "El apellido debe tener al menos 2 caracteres"
            : ""
        errors.mail = 
            validEmailRegex.test(this.state.newUser.mail)
            ? ""
            : "Introduzca un correo electrónico válido"
        
        this.setState({
            errors
        })
        if (this.state.errors.username === "" && this.state.errors.passwordValidation === "" && this.state.errors.password === "" && this.state.errors.name=== "" && this.state.errors.surname=== "" && this.state.errors.mail=== "" ){
             const response = await this.props.createAccount(this.state.newUser)
            
             if (response.success === true){
               
                
                
            }else{
                if (response.username !== ""){
                    this.setState({
                        errors:{
                            ...this.state.errors,
                            username:response.username
                        } 
                    })
                }
                if (response.mail !== ""){
                    this.setState({
                        errors:{
                            ...this.state.errors,
                            mail:response.mail
                        } 
                    })
                }
            }
             
        }
        
        
        //
    }
    
    responseGoogle = async (response) =>{

        this.setState({
            ...this.state,
            newUser:{
                username:response.profileObj.email,
                password:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, "")+response.profileObj.familyName.trim().charAt(0).toUpperCase() + response.profileObj.familyName.trim().charAt(0).toLowerCase(),
                name:response.profileObj.givenName,
                surname:response.profileObj.familyName.trim(),
                mail: response.profileObj.email,
                passwordValidation:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, "")+response.profileObj.familyName.trim().charAt(0).toUpperCase() + response.profileObj.familyName.trim().charAt(0).toLowerCase(),
                loginGoogle: true
                
            }
        })
        const res = await this.props.createAccount(this.state.newUser)
       
        if (res.success === true){   
            
        }else{
            if (res.username !== ""){
                Swal.fire({  
                    title: 'Ingresa a tu cuenta!',  
                    text: `Ya estas registrado con esta cuenta de Google`, 
                    imageUrl: 'https://sdl-stickershop.line.naver.jp/products/0/0/1/1137640/android/stickers/5615102.png',
                    imageAlt: 'Bienvenida de la vaca triste',  
                    showConfirmButton: false, 
                    timer: 3000,
                    allowOutsideClick: false
                })
            }
            
        }
    }

    
    render(){

        const helado = require('../images/helado.jpg')
        const alfajores = require('../images/alfajores.jpg')

        const load = {

        }

        return (
            <>
            <Header />
            <div className="back-signUp">
                <div className="RightBack-signUp" style={{backgroundImage: `url(${helado})`}}>
                </div>

                <div className="alfajores" style={{ backgroundImage: `url(${alfajores})`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
                    <div className="cardInputs-signUp">
                        <h5 className="titleHouses">Para registrarte llene el siguiente formulario</h5>
                        <div className="signContainer">
                            <div style={{height: '5px', width: '100%', marginBottom: '4vh'}}>
                                <Progress   style={{transition: 'all 1s'}} 
                                            value={this.state.load.value}
                                />
                            </div>
                            <div className="inputs">
                                <span className={this.state.errors.mail === "" ? "" : "logError"}>{this.state.errors.mail}</span>
                                <input className="mail" type="mail" placeholder="Email" name="mail" autocomplete="off" onFocus={() => this.progres(16)} onChange={this.getForm} />
                                
                                <span className={this.state.errors.username === "" ? "" : "logError"}>{this.state.errors.username}</span>
                                <input className="account" type="text" placeholder="Nombre de usuario" name="username" autocomplete="off" onFocus={() => this.progres(16)} onChange={this.getForm} />
                                
                                <span className={this.state.errors.password === "" ? "" : "logError"}>{this.state.errors.password}</span>
                                <input className="password" type="password" placeholder="Contraseña" name="password" autocomplete="off" onFocus={() => this.progres(16)} onChange={this.getForm} />
                                
                                <span className={this.state.errors.passwordValidation === "" ? "" : "logError"}>{this.state.errors.passwordValidation}</span>
                                <input className="passwordCheck" type="password" placeholder="Por favor, repita su contraseña" name="passwordValidation" autocomplete="off" onFocus={() => this.progres(16)} onChange={this.getForm}  />
                                
                                <span className={this.state.errors.name === "" ? "" : "logError"}>{this.state.errors.name}</span>
                                <input className="name" type="text" placeholder="Nombre completo" name="name" autocomplete="off" onFocus={() => this.progres(16)} onChange={this.getForm}  />
                                
                                <span className={this.state.errors.surname === "" ? "" : "logError"}>{this.state.errors.surname}</span>
                                <input className="surname" type="text" placeholder="Apellido/s" name="surname" autocomplete="off" onFocus={() => this.progres(25)} onChange={this.getForm} />
                            </div>
                            <button className="send" onClick={this.submit}><span>Crear cuenta </span></button>
                            <p className="or">Ó</p>
                            <GoogleLogin
                                className="googleBtn"
                                clientId="410495293057-2vf4ipg2vojn0pdvjg2p4pc8269vcbbq.apps.googleusercontent.com"
                                buttonText="Crea tu cuenta con Google"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                            <p style={{color: 'white', marginTop: '5vh', textAlign: 'center'}}>¿Ya tienes cuenta? <NavLink style={{color: 'white'}} to="/sign-in">ingresa aquí</NavLink></p>
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
    createAccount: usersActions.createUser
}

const mapStateToProps = (state) =>{
    return{
        userLog: state
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
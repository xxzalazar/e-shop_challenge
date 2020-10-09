import React from 'react';
import './styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from "./pages/Home"
import Products from './pages/Products';
import Cart from './pages/Cart'
import HomeAdmin from './pages/HomeAdmin'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import LogOut from './pages/LogOut'
import Item from './components/Item';
import Buy from './pages/Buy'
import Faq from './pages/Faq'
import {connect} from 'react-redux'
import usersActions from './redux/actions/usersActions'
import Profile from './components/EditProfile'
import Thanks from './components/Thanks';

class App extends React.Component{
  
  render(){
    
    var normalRoutes = (
      <Switch>
        <Route exact path ="/" component={Home}/>
        <Route path = "/productos" component={Products}/>
        <Route path = "/producto/:id" component={Item}/>
        <Route path = "/faqs" component={Faq} />
        <Route path ="/profile" component={Profile}/>
        <Route path ="/comprar" component ={Buy}/>
        <Route path = "/carrito" component={Cart} />
        <Route path = "/mi-cuenta" component={Home} />
        <Route path = "/log-out" component={LogOut}/>
        <Route path ="/comprar" component ={Buy}/>
        <Route path="/gracias" component ={Thanks} />
        <Redirect to = "/" />
      </Switch>
    )
    var adminRoutes = (
      <Switch>
        <Route exact path ="/admin-home" component={HomeAdmin}/>
        <Route path = "/log-out" component={LogOut}/>
        <Redirect to = "/admin-home" component={HomeAdmin}/>
      </Switch>
    ) 
    var unlogedRoutes = (
      <Switch>
        <Route exact path ="/" component={Home}/>
        <Route path = "/productos" component={Products}/>
        <Route path = "/producto/:id" component={Item}/>
        <Route path ="/comprar" component ={Buy}/>
        <Route path = "/faqs" component={Faq} />
        <Route path = "/sign-in" component={LogIn} />
        <Route path = "/sign-up" component={SignUp} />
        <Redirect to = "/" />
      </Switch>
    ) 

    if(this.props.token){
      if(this.props.role === "admin"){
        var routes = adminRoutes
      }else{
        var routes = normalRoutes
      }
    }else if(localStorage.getItem('token')){
      this.props.forcedLogIn(localStorage.getItem('token'))
      
      if(this.props.role === "admin"){
        var routes = adminRoutes
      }else{
        var routes = normalRoutes
      }
      
    }else{
      var routes = unlogedRoutes
    }



    return(
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    )
  }

}

const mapStateToProps = (state) => {
  
  return {
    token: state.usersRed.token,
    role: state.usersRed.role
  }
}
const mapDispatchToProps = {
  forcedLogIn: usersActions.forcedLogIn
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react'
import Navbar from './component/Navbar'
import './supports/css/component.css'
import './supports/css/utils.css'
import './supports/css/LandingPage.css'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ListProducts from './pages/ListProducts'
import Brands from './pages/Brands'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Footer from './component/Footer'
import CreatePassword from './pages/CreatePassword'
import DetailProduct from './pages/DetailProduct'
import Checkout from './pages/Checkout'
import TransactionHistory from './pages/TransactionHistory'
//import Statistic from './pages/Statistic'
// import ManageProduct from './pages/manageProduct'



  export class App extends Component{
    render() {
      return(
        // <manageProduct/>
        <BrowserRouter>

        <div>
          <Navbar />

        <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/products' component={ListProducts} />
        <Route path='/brands' component={Brands} />
        <Route path='/Cart' component={Cart} />
        <Route path='/register' component={Register} />
        <Route path='/checkout/:idTrans' component={Checkout} />
        <Route path='/transaction-history' component={TransactionHistory} />
        <Route path='/detail-product/:bebas' component={DetailProduct} />
        <Route path='/create-password' component={CreatePassword} /> 


        </Switch>

        <Footer/>

        </div>
        </BrowserRouter>
      )
    }
  }

  export default App
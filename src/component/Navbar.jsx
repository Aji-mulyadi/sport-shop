import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import apiUrl from '../supports/constants/apiUrl'
import LoginModal from './LoginModal'

export class Navbar extends Component {

    state ={
        openToggle : false,
        isLogin : false,
        data : null,
        modalOpen : false,
        cartLength : 0
    }

    componentDidMount(){
        this.getIdUser()
        this.getDataCartLength()
    }

    getDataCartLength = () => {
        const idUser = localStorage.getItem('id')
        if(idUser){
            Axios.get(apiUrl + 'carts?id_user=' + idUser)
            .then((res) => {
                if(res.status === 200){
                    this.setState({cartLength : res.data.length})
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
      
    }


    onLogout = () => {
        if(window.confirm('are you sure want to logout??')){
            localStorage.removeItem('id')
            window.location = '/'
        }
    }

    getIdUser = () => {
        var id = localStorage.getItem('id')
        console.log(id)
        if(id){
            this.setState({isLogin : true})
            Axios.get(apiUrl + 'users/' + id)
            .then((res)=> {
                if(res.data.email){
                    this.setState({data : res.data.email})
                }else{
                    this.setState({data : res.data.phone})
                }
            })
            .catch((err) => {
                console.log(err)
                alert(err.message)
            })
        }else{
            this.setState({isLogin : false})
        }
        // get value di localstorage
        // kalau value ada
        // set is login = true
    }

    render() {
        return (
            <div className='sporteens-bg-main-dark py-4'>
                <div className="container">

                    <div className="row justify-content-between px-4">

                        {/* Header Logo */}
                        <div className="sporteens-light sporteens-logo-header sporteens-clickable-el ">
                            <Link to='/' className='sporteens-link'>
                                Logo
                            </Link>
                        </div>

                        {/* Header Items */}
                        <div className="sporteens-light sporteens-items-header d-none d-md-block">
                            <span className='mr-md-3 sporteens-clickable-el'>
                                <Link to='/' className='sporteens-link'>
                                    Home
                                </Link>
                            </span>
                            <span className='mr-md-3 sporteens-clickable-el'>
                                <Link to='/products' className='sporteens-link'>
                                    Products
                                </Link>
                            </span>
                            <span className='mr-md-3 sporteens-clickable-el'>
                                <Link to='/brands' className='sporteens-link'>

                                Brands
                                </Link>
                            </span>

                            {this.state.isLogin ? 
                                <span>
                                     <span className='mr-md-3 sporteens-clickable-el' >
                                        <Link to='/transaction-history' className='sporteens-link'>

                                        History
                                        </Link>
                                    </span>   
                                    <span className='mr-md-3 sporteens-clickable-el' >
                                        <Link to='/cart' className='sporteens-link'>

                                        Cart <span class="badge badge-light">{this.state.cartLength}</span>
                                        </Link>
                                    </span>   
                                    <span className='d-inline-block mr-md-3 sporteens-clickable-el' >
                                        <img width='30px' className='mr-2' src='https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png' alt='avatar-circle' />
                                        <Link onClick={this.onLogout} className='sporteens-link h-100 d-inline-block'>
                                            {this.state.data ? this.state.data.slice(0,4) + '...' : null}
                                        </Link>
                                    </span>
                                </span>
                                :
                                <span>
                                    <span className='mr-md-3 sporteens-clickable-el' >
                                       <LoginModal isi='Login' />
                                    </span>  
                                    <span className='mr-md-3 sporteens-clickable-el' >
                                        <Link to='/register' className='sporteens-link'>
                                            Register
                                        </Link>
                                    </span>  
                                </span>
                            
                            }

                               
                        </div>


                        {/* Header Icons Mobile */}
                        <div className='sporteens-light sporteens-items-mobile d-md-none'>
                            {
                                this.state.openToggle ?
                                <span onClick={ () =>this.setState({openToggle : false})} className='sporteens-clickable-el'>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </span> 
                                :
                                <span onClick={ () =>this.setState({openToggle : true})} className='sporteens-clickable-el'>
                                    <FontAwesomeIcon icon={faBars}/>
                                </span> 

                            }
                        </div>


                    </div>


                    {/* Header Items Mobile */}
                    {
                        this.state.openToggle ?
                            <div className="sporteens-light sporteens-header-items-mobile px-2 d-md-none">
                                <div className="mt-3 border-bottom sporteens-clickable-el">
                                    Home
                                </div>
                                <div className="mt-3 border-bottom sporteens-clickable-el">
                                    Products
                                </div>
                                <div className="mt-3 border-bottom sporteens-clickable-el">
                                    Brands
                                </div>
                                <div className="mt-3 border-bottom sporteens-clickable-el">
                                    Carts
                                </div>
                            </div>
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}

export default Navbar;
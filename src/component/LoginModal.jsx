import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { Link} from 'react-router-dom'
import Axios from 'axios'
import emailValidator from '../supports/functions/EmailValidator'
import phoneValidator from '../supports/functions/PhoneNumberValidator'

import apiUrl from '../supports/constants/apiUrl'

export class LoginModal extends Component {
    state = {
        modalOpen : false,
        errorState : null
    }

    onSubmitBtn = () => {
        var data = this.refs.data.value
        var pass = this.refs.password.value
        if(data && pass){
            if(Number(data[0]) >= 0){
                if(phoneValidator(data) === true){
                    var phoneQuery = 'phone=' + data + '&password=' + pass
                    this.userLogin(phoneQuery)
                    // login
                }else{
                    this.setState({errorState : phoneValidator(data)})
                }
            }else{
                if(emailValidator(data)){
                    var emailQuery = 'email=' + data + '&password=' + pass
                    this.userLogin(emailQuery)
    
                    // login
                }else{
                    this.setState({errorState : 'Email Format Not Correct'})
                }
                // email
            }
        }else{
            this.setState({errorState : 'form must be filled'})
        }
    }

    userLogin = (data) => {
        Axios.get(apiUrl + 'users?' + data)
        .then((res) => {    
            if(res.data.length > 0){
                alert("Login Success")
                localStorage.setItem('id',res.data[0].id)
                window.location = '/'
                // data ada
            }else{
                this.setState({errorState : "Email or password incorrect"})
                // error
            }
        })
        .catch((err) => {
            this.setState({errorState : err.message})
        })
    }
    
    render() {
        return (
            <span>
                <span onClick={() => this.setState({modalOpen : true})} className={this.props.className}>{this.props.isi}</span>
                <Modal toggle={() => this.setState({modalOpen : false})} isOpen={this.state.modalOpen}>
                    <ModalHeader toggle={() => this.setState({modalOpen : false})}>
                        Login Here
                    </ModalHeader>
                    <ModalBody>
                        <input type='text' ref='data' placeholder='enter your phone / email' className='form-control' />
                        <input type='password' ref='password' placeholder='enter your password' className='form-control mt-3' />
                        {
                            this.state.errorState ? 
                            <div className="alert alert-danger mt-3">{this.state.errorState}</div>
                            :
                            null
                        }

                        <input type="button" onClick={this.onSubmitBtn} className='btn btn-info mt-1' value='submit'/>

                    </ModalBody>
                    <ModalFooter>
                    <p className='text-center sporteens-font-14'>Don't have account yet? <Link to='/register' className='sporteens-link'> <span className='sporteens-clickable-el sporteens-main-dark font-weight-bold'> Register here </span> </Link></p>

                    </ModalFooter>
                </Modal>
            </span>
        )
    }
}

export default LoginModal
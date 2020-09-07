import React, { Component } from 'react';
import Axios from 'axios';
import apiUrl from '../supports/constants/apiUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


export class CreatePassword extends Component {
    state = {
        seePassword : false,
        seeConfrimPassword : false,
        errorPasswordMessage1 : false,
        errorPasswordMessage2 : false

        
    }

    onPasswordValidation  = () => {
        //ambil value inputan
        let pass = this.refs.pass.value
        let passconfirm = this.refs.passconfirm.value

        if(pass && passconfirm !== ''){
            this.setState({errorPasswordMessage1 : true})
            // Validasi Inputan Password dan Confirm Password
            if(pass !== passconfirm){
                // Apabila Password dan Confirm Password TIDAK SAMA
                this.setState({errorPasswordMessage2 : 
                    <div className="container">
                        <div className="row align-items-center sporteens-secondary">
                            <FontAwesomeIcon icon={faTimesCircle} className="fa-xs" />Password does not match
                        </div>
                        <div className="py-2">
                        
                        </div>
                    </div>
                })
            }else{
                // Apabila Password dan Confirm Password SAMA
                this.setState({errorPasswordMessage2 : true})
            }
        }else{
            this.setState({errorPasswordMessage1 : 
                <div className="container">
                    <div className="row align-items-center sporteens-secondary">
                        <FontAwesomeIcon icon={faTimesCircle} className="fa-xs" />Password must be filled
                    </div>
                </div>
            })
        }
    }


    onSubmitBtnClick = () => {
        // get value
        let pass = this.refs.pass.value
        let passconfirm = this.refs.passconfirm.value

        if(pass && passconfirm){
            var id = this.props.location.pathname.split('/')[2]

            // check input 1 dan 2 harus sama
            if(pass === passconfirm){
                Axios.patch(apiUrl + 'users/' + id, {password : pass})
                .then((res) => {
                    console.log(res)
                    alert('create password success')
                    window.location = '/'
                })
                .catch((err) => {
                    console.log(err)
                })
                // kirim ke api
            }else{
                alert('Password and confirm password didnt match')
            }
        }

        // password harus lebih dari 8 digit
    }

    render() {
        return (
            <div className='py-5 px-3'>
                <h1 className='text-center'> Create Password Here !! </h1>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-4 p-5 sporteens-bg-main-dark rounded sporteens-shadow">
                       <div className=''>
                            <div className='input-group'>
                                <input type= {this.state.seePassword? "text" : "password"} ref='pass' onChange={this.onPasswordValidation} className='form-control' placeholder='enter password' required/>
                                    <div>
                                        <span onClick={() => {this.state.seePassword? this.setState({seePassword : false}) : this.setState({seePassword : true})}} className="sporteens-bg-light sporteens-dark  input-group-text border-left-0">
                                            {   
                                            this.state.seePassword?
                                            <i><FontAwesomeIcon icon={faEye} /></i>
                                            :
                                            <i><FontAwesomeIcon icon={faEyeSlash} /></i>
                                            }   
                                        </span>
                                    </div>
                            </div>
                       </div>
                        <div className=''>
                            <div className='input-group'>
                                <input type= {this.state.seePassword? "text" : "password"} ref='passconfirm' onChange={this.onPasswordValidation} className='form-control mt-3' placeholder='confirm password' required/>
                                    <div>
                                        <span onClick={() => {this.state.seePassword? this.setState({seePassword : false}) : this.setState({seePassword : true})}} className="sporteens-bg-light sporteens-dark input-group-text border-left-0 mt-3">
                                            {   
                                            this.state.seePassword?
                                            <i><FontAwesomeIcon icon={faEye} /></i>
                                            :
                                            <i><FontAwesomeIcon icon={faEyeSlash} /></i>
                                            }   
                                        </span>           
                                    </div>
                            </div>
                        </div>
                        {this.state.errorPasswordMessage1}
                        {this.state.errorPasswordMessage2}
                            
                        <input type="button" onClick={this.onSubmitBtnClick} value="Submit" className='sporteens-main-dark w-100 mt-5'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePassword
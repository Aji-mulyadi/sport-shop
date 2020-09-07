import React, { Component } from 'react';
import Axios from 'axios';
import apiUrl from '../supports/constants/apiUrl';
import LoadingPage from '../component/LoadingPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import LoginModal from '../component/LoginModal';


class ViewProduct extends Component{
    state = {
        data : null,
        modalOpen : false,
        selectedPhoto : null,
        isLogin : false
    }

    componentDidMount(){
        window.scrollTo(0,0)
        this.getDataProductsById()
        this.getLoginStatus()
    }
    getLoginStatus = () => {
        const id = localStorage.getItem('id')
        if(id){
            this.setState({isLogin : true})
        }else{
            this.setState({isLogin:  false})
        }
    }

    getDataProductsById = () => {
        // console.log(this.props.location.pathname.split('/')[2])
        var id = this.props.match.params.bebas
        Axios.get(apiUrl + "products/" + id)
        .then((res) => {
            console.log(res.data)
            this.setState({data : res.data,selectedPhoto : res.data.image1})
        })
        .catch((err) => {
            console.log(err)
        })
    }
    onAddToCartClick = () => {
        const data = {
            id_user : Number(localStorage.getItem('id')),
            id_product : Number(this.props.match.params.bebas),
            qty : 1
        }

        if(data.id_user && data.id_product && data.qty){
            Axios.get(apiUrl + 'carts?id_user=' + data.id_user + '&id_product=' + data.id_product)
            .then((res) => {
                if(res.data.length === 0){
                    Axios.post(apiUrl + 'carts' , data)
                    .then((res) => {
                        if(res.status === 201){
                            alert("Add to cart success");
                            window.location = '/cart'
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }else{
                    var qty = res.data[0].qty + 1
                    Axios.patch(apiUrl + 'carts/' + res.data[0].id , {qty : qty})
                    .then((res) => {
                        if(res.status === 200){
                            alert("qty updated");
                            window.location = '/cart'
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }
            })
        }
    }
    

    render(){
        if(this.state.data === null) {
            return (
                <LoadingPage />
            )
        }
        return(
            <div>
                <div className="container mt-5">
                    
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="row justify-content-center px-3 py-3">
                                <div className="col-12 text-center py-3">
                                    <img src={this.state.selectedPhoto} alt="" width="75%" />
                                </div>
                                <div className="col-3 text-center w-100">
                                    <img className={this.state.selectedPhoto === this.state.data.image1 ? 'sporteens-clickable-el border' : 'sporteens-clickable-el'} onClick={() =>this.setState({selectedPhoto : this.state.data.image1})} src={this.state.data.image1} alt="" width="75%" />
                                </div>
                                <div className="col-3 text-center w-100">
                                    <img className={this.state.selectedPhoto === this.state.data.image1 ? 'sporteens-clickable-el border' : 'sporteens-clickable-el'} onClick={() =>this.setState({selectedPhoto : this.state.data.image1})} src={this.state.data.image1} alt="" width="75%" />
                                </div>
                                <div className="col-3 text-center w-100">
                                    <img className={this.state.selectedPhoto === this.state.data.image1 ? 'sporteens-clickable-el border' : 'sporteens-clickable-el'} onClick={() =>this.setState({selectedPhoto : this.state.data.image1})} src={this.state.data.image1} alt="" width="75%" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 pt-4">
                            <h3 className='sporteens-main-dark'>{this.state.data.name}</h3>
                            <span className='text-secondary'>Terjual 5 Produk</span>
                            {
                                this.state.data.discount ? 
                                <span className='pt-3'>

                                    <h3 className="text-danger pt-3">  Rp.{(this.state.data.price - (this.state.data.price * (this.state.data.discount/100))).toLocaleString('id-ID')}  <span className='sporteens-font-14 sporteens-main-dark'><s>Rp {this.state.data.price.toLocaleString('id-ID')} </s></span></h3>
                                </span>
                                :
                                <h3 className="text-danger pt-3">  Rp.{(this.state.data.price - (this.state.data.price * (this.state.data.discount/100))).toLocaleString('id-ID')}</h3>
                            }
                            <hr className="mt-3" />
                            <h5 className="font-weight-bold">Stock</h5>
                            <h5 className="font-weight-light text-secondary sporteens-font-12">{this.state.data.Stock} Pcs</h5>
                            <h5 className="font-weight-bold">Berat</h5>
                            <h5 className="font-weight-light text-secondary sporteens-font-12">200 Gram</h5>
                            <hr className="mt-3" />
                            <h5 className="font-weight-bold">Deskripsi : </h5>
                            <h6 className="font-weight-light sporteens-font-14">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, vero ipsum fuga delectus quasi, voluptates eos aut fugiat impedit praesentium rerum exercitationem eaque quidem? Ipsam fuga similique magnam blanditiis est?</h6>
                            <div className="row pt-3">
                                <div className="col-5 col-md-6">
                                    {
                                        this.state.isLogin ? 
                                        <input type="button" onClick={this.onAddToCartClick}  value="Add To Cart" className="btn rounded-0 w-100 sporteens-bg-main text-white"/>
                                        :
                                        <LoginModal isi='Add to cart' className='btn rounded-0 w-100 sporteens-bg-main text-white' />
                                    }
                                
                                </div>
                                <div className="col-5 col-md-6">
                                <div className='border p-1 rounded d-inline-block h-100 sporteens-clickable-el'>
                                       { 
                                       this.state.isLogin ?
                                       <FontAwesomeIcon icon={faHeart}  className='text-danger'/>
                                       :
                                       <LoginModal isi={<FontAwesomeIcon icon={faHeart}  className='text-danger'/>} />
                                       }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ViewProduct 
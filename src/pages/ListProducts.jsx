import React, { Component } from 'react'
import './../supports/css/ListProducts.css'
import Axios from 'axios'
import apiUrl from '../supports/constants/apiUrl'
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'



export class ListProducts extends Component {
    state = {
        data :null, // gaboleh diubah ubah
        filteredData : null,
        modalFilterOpen : false,
        allBrands : null,
        allCategories : null
    }

    componentDidMount(){
        this.getAllProducts()
    }


    getAllProducts = () => {
        Axios.get(apiUrl + "products")
        .then((res) => {
            console.log(res.data)
            var allBrand = []
            var allCategories = []
            res.data.forEach((val) => {
                if(!allBrand.includes(val.brand)){
                    allBrand.push(val.brand)
                }
                if(!allCategories.includes(val.category)){
                    allCategories.push(val.category)
                }
            })

         
            this.setState({data : res.data,filteredData : res.data,allBrands : allBrand, allCategories:allCategories})
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onChangeSort = () => {
        var sortBy = this.refs.sort.value
        var data = this.state.data
        if(sortBy === 'higherPrice'){
            data.sort((a,b) => {
                return b.price - a.price
            })
            // sort dari harga tertinggi
        }else if(sortBy === 'lowerPrice'){
            data.sort((a,b) => {
                return a.price - b.price
            })
            // sort dari harga terendah

        }else if(sortBy === 'discount'){
            data.sort((a,b) => {
                return b.discount - a.discount
            })
            // sort dari discount tertinggi

        }else if(sortBy === 'sort'){
            data.sort((a,b) => {
                return a.id - b.id
            })
            // ubah ke default
        }
        this.setState({filteredData : data})
    }

    renderDataToJsx = () => {
        return this.state.filteredData.map((val) => {
            return(
                <div className="col-6 mt-3 col-md-3 ">
                    <div className='border bg-white p-3 h-100'>
                        <Link to={'/detail-product/' + val.id} className='sporteens-link'>
                            <img className='sporteens-clickable-el' src={val.image1} width='100%'  alt="product"/>
                            <p  className='p-0 m-0 sporteens-main-dark font-weight-bold sporteens-clickable-el'>{val.name.slice(0,20) + '...' }</p>
                        </Link>
                        {
                            val.discount ? 
                            <span>
                                <p className='p-0 m-0 text-danger'>{val.discount}% Off</p>
                                <p className='p-0 m-0 text-secondary sporteens-font-14'> <s>Rp. {val.price.toLocaleString('id-ID')}</s> </p>
                                <p className='p-0 m-0 sporteens-main-dark '> Rp. {(val.price * (1 - val.discount/100)).toLocaleString('id-ID')} </p>
                            </span>
                            :
                            // <span className='d-flex border'>
                                <p className='p-0 m-0 sporteens-main-dark '> Rp. {val.price.toLocaleString('id-ID')} </p>
                            // </span>
                        }
                        
                    </div>
                </div>
            )
        })
    }

    modalFilterSwitch = () => {
        this.setState({modalFilterOpen : !this.state.modalFilterOpen})
    }

    onApplyFilterClick = () => {
        var category = this.refs.category.value // all
        var brand = this.refs.brand.value
        var filteredData = this.state.data

        if(!(category === 'all') || !(brand === 'all')){
            filteredData = this.state.data.filter((val) => {
                if(category === 'all'){
                    return val.brand === brand
                }
                if(brand === 'all'){
                    return val.category === category
                }
                return val.category === category && val.brand ===  brand
            })
            console.log(filteredData)
        }

        this.setState({filteredData : filteredData,modalFilterOpen : false})
    }

    render() {
        return (
            <div>
                {/* Modal Filter */}
                <Modal centered={true} toggle={this.modalFilterSwitch} isOpen={this.state.modalFilterOpen}>
                    <ModalHeader toggle={this.modalFilterSwitch}>
                        Filter By
                    </ModalHeader>
                    <ModalBody>
                        <p className='p-0 m-0 sporteens-font-14 font-weight-bold'>Category</p>
                        <select ref='category' className='form-control mt-2'>
                            <option value='all'>All Category</option>
                            {
                                this.state.allCategories ?
                                this.state.allCategories.map((val) => {
                                    return(
                                        <option value={val}>{val}</option>
                                    )
                                })
                                :null
                            }
                        </select>

                        <p className='p-0 m-0 mt-4 sporteens-font-14 font-weight-bold'>Brand</p>
                        <select ref='brand' className='form-control mt-2'>
                            <option value='all'>All Brands</option>
                                {
                                    this.state.allBrands ?
                                    this.state.allBrands.map((val) => {
                                        return(
                                            <option value={val}>{val}</option>
                                        )
                                    })
                                    :null
                                }
                        </select>
                    </ModalBody>
                    <ModalFooter>
                        <input type="button" value="Apply" onClick={this.onApplyFilterClick} className='btn btn-info'/>
                    </ModalFooter>
                </Modal>


                {/* Jumbotron Section */}
                {/* <div>
                    <div className="sporteens-jumbotron-list-products">
                        <div className="row container align-items-center h-100">
                            <div className="row align-items-center h-100">
                                <div className="col-md-12 text-center text-md-left sporteens-light">
                                    <h1 className="sporteens-light float-sm-left ml-5">Get Your Product Here</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div>
                    <div className="sporteens-jumbotron-list-products">
                        <div className="container h-100">
                            <div className="row align-items-center h-100">
                                <div className="col-md-12 text-center text-md-left sporteens-light">
                                    {/* <h1 className="sporteens-jumbotron-title-list-products">Get Your Product Here</h1> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* Content Section */}

                <div className="container mt-4">
                    <div className='text-right'>
                        <span onClick={this.modalFilterSwitch} className='sporteens-font-14 text-secondary sporteens-clickable-el mr-2'>Filter <FontAwesomeIcon icon={faChevronDown} /></span>
                        <select ref='sort' onChange={this.onChangeSort}  className='sporteens-font-14 text-secondary sporteens-clickable-el sporteens-dropdown ml-3'>
                            <option value="sort">Sort By</option>
                            <option value="higherPrice">Higher Price</option>
                            <option value="lowerPrice">Lower Price</option>
                            <option value="discount">Discount</option>
                        </select>
                    </div>
                    <div className="row mt-4">
                        {
                            this.state.data === null ?
                            <div className='col-12 my-5'>
                            <Loader className='text-center p-0 m-0' type="ThreeDots" color="#364f6b" height={40} width={40} />
                            <p className='text-center sporteens-main-dark'>loading</p>
                            </div>
                            :
                            this.renderDataToJsx()
                        }
                        
                        
                    </div>

                </div>
            </div>
        )
    }
}

export default ListProducts
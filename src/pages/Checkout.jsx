import React from 'react'
import Axios from 'axios'
import apiUrl from '../supports/constants/apiUrl';
import moment from 'moment'

export class Checkout extends React.Component{
    state = {
        paymentMethods1Toggle : false,
        paymentMethods2Toggle : false,
        paymentMethods3Toggle : false,
        data : null
    }

    componentDidMount(){
        this.getDataTransactionUnpaid()
    }
    getDataTransactionUnpaid = () => {
        var id = this.props.match.params.idTrans
        Axios.get(apiUrl + 'transactions/' + id)
        .then((res) => {
            console.log(res)
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }


    render(){
        return(
            <div>
                {/* CHECKOUT SECTION */}
                <div className="container-fluid my-5 px-5">
                    <div className="row justify-content-center">
                        {/* Page Title */}
                        <div className="col-12">
                            <h2 className="mx-3 text-center font-weight-bold">Checkout Page</h2>
                        </div>

                        {/* Shipping dress */}
                        {/* <div className="col-12 col-md-6 py-3">
                            <div className="px-3 pt-3 pb-1">
                                <h4>Shipping Address</h4>
                            </div>
                            <div className="px-4 py-1 border rounded shadow">
                                <p className="mt-3 mb-0 font-weight-bold">
                                    M. Defryan Tridya Isfandy (081214186000)
                                </p>
                                <p className="mt-0 mb-0">
                                    Kemantren RT 06/RW 01, Desa Kemantren, Kecamatan Tulangan, Kabupaten Sidoarjo, Jawa Timur, 61273.
                                    (Mushollah Baitulmuttaqin)
                                </p>
                                <p className="mt-3 mb-0 font-weight-bold text-danger">
                                    Notes :
                                </p>
                                <p>
                                    Titipkan Ke Rumah Sebelah Apabila Tidak Ada Orang di Rumah
                                </p>
                            </div>
                            
                            <div className="pt-3 pb-3">
                                <input type="button" value="Change Shipping Address" className="btn sporteens-bg-main-dark rounded-0 w-100 py-2 text-white"/>
                            </div>
                        </div> */}

                        {/* My Orders & Payment Methods */}
                        <div className="col-12 col-md-6 py-3">
                            <div className="px-3 pt-3 pb-1">
                                <h4>My Orders</h4>
                                <p>Date : {this.state.data ? moment(this.state.data.createdAt).format('MMMM Do YYYY, h:mm:ss a') : 'loading ..'}</p>
                                <div className="row pt-1">
                                    <div className="col-8 py-2 border border-right-0 font-weight-bold">
                                        Items
                                    </div>
                                    <div className="col-4 py-2 border font-weight-bold ">
                                        Sub-Total
                                    </div>
                                    
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="font-weight-bold">Sub-Total</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        Rp. {this.state.data ? this.state.data.totalPrice.toLocaleString('id-ID') : 'loading ..'}
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="font-weight-bold">Shipping Rates</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        Rp. 20.000
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="font-weight-bold">Unique Digit</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        Rp. 495
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-right-0">
                                        <span className="text-danger font-weight-bold">Total</span>
                                    </div>
                                    <div className="col-4 py-2 border border-top-0">
                                        Rp. {this.state.data ? (this.state.data.totalPrice + 20000 + 495).toLocaleString('id-ID') : 'loading ..'}
                                    </div>
                                </div>
                            </div>
                            <div className="px-3 pt-5 pb-1">
                                {/* <h4>Payment Methods</h4> */}
                                <div className="row pt-1">
                                    {/* <div className="col-2 py-2 border border-right-0 text-center font-weight-bold">
                                        <img src="https://3.bp.blogspot.com/-e1fOq9uUk8M/V15O0WHiIMI/AAAAAAAAAJA/IpxPlLevxLsjisy2I625Yvz-eNzgc6xfgCKgB/s640/Logo%2BBank%2BBNI%2BPNG.png" alt="Bank BNI" width="100%" />
                                    </div>
                                    <div className="col-8 py-2 border border-left-0 border-right-0 font-weight-bold">
                                        BNI Bank Transfer
                                    </div>
                                    <div onClick={() => this.setState({ paymentMethods1Toggle : !this.state.paymentMethods1Toggle })} className="col-2 py-2 border border-left-0 text-right sporteens-clickable-el">
                                        {
                                            this.state.paymentMethods1Toggle?
                                                <FontAwesomeIcon icon={faChevronDown} className="fa-xs" />
                                            :
                                                <FontAwesomeIcon icon={faChevronRight} className="fa-xs" />
                                        }
                                    </div> */}
                                    {/* {
                                        this.state.paymentMethods1Toggle?
                                            <div className="col-12 py-2 border border-top-0">
                                                2468 - 10121418 - 3000 ( A/N PT. Football Store Indonesia )
                                            </div>
                                        :
                                            null
                                    } */}
                                    {/* <div className="col-2 py-2 border border-top-0 border-right-0 text-center font-weight-bold ">
                                        <img src="https://1.bp.blogspot.com/-ftTB8bnkTPA/XUJbw4V3afI/AAAAAAAABto/F_-6eIBe7iMuS_5AJodNooYTtBuCaMZ6gCEwYBhgL/s1600/Logo%2BGopay%2BBaru.png" alt="Gopay" width="100%" />
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-left-0 border-right-0 font-weight-bold ">
                                        Gopay Account
                                    </div>
                                    <div onClick={() => this.setState({ paymentMethods2Toggle : !this.state.paymentMethods2Toggle })} className="col-2 py-2 border border-top-0 border-left-0 text-right sporteens-clickable-el ">
                                        {
                                            this.state.paymentMethods2Toggle?
                                                <FontAwesomeIcon icon={faChevronDown} className="fa-xs" />
                                            :
                                                <FontAwesomeIcon icon={faChevronRight} className="fa-xs" />
                                        }
                                    </div>
                                    {
                                        this.state.paymentMethods2Toggle?
                                            <div className="col-12 py-2 border border-top-0">
                                                0812-1418-6000 ( A/N PT. Football Store Indonesia )
                                            </div>
                                        :
                                            null
                                    }
                                    <div className="col-2 py-2 border border-top-0 border-right-0 text-center font-weight-bold ">
                                        <img src="https://1.bp.blogspot.com/-Le-OjhRx8lM/XmMnhn40y9I/AAAAAAAABr0/bOQ8PWjEjQ0QBuh3s4L_13jJHUj4O47qwCLcBGAsYHQ/s1600/Logo%2BIndomaret.png" alt="Indomaret" width="100%" />
                                    </div>
                                    <div className="col-8 py-2 border border-top-0 border-left-0 border-right-0 font-weight-bold ">
                                        Indomaret
                                    </div>
                                    <div onClick={() => this.setState({ paymentMethods3Toggle : !this.state.paymentMethods3Toggle })} className="col-2 py-2 border border-top-0 border-left-0 text-right sporteens-clickable-el ">
                                        {
                                            this.state.paymentMethods3Toggle?
                                                <FontAwesomeIcon icon={faChevronDown} className="fa-xs" />
                                            :
                                                <FontAwesomeIcon icon={faChevronRight} className="fa-xs" />
                                        }
                                    </div>
                                    {
                                        this.state.paymentMethods3Toggle?
                                            <div className="col-12 py-2 border border-top-0">
                                                "495" + 0812-1418-6000
                                            </div>
                                        :
                                            null
                                    } */}
                                    <div className="col-12 px-0 py-0 mx-0 my-3">
                                        <input type="button" value="Pay My Orders" className="btn rounded-0 w-100 py-2 sporteens-bg-main-dark text-white"/>
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

export default Checkout
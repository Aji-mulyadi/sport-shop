import React, { Component } from 'react'
import Axios from 'axios'
import apiUrl from '../supports/constants/apiUrl'
import moment from 'moment'
import {Link} from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export class TransactionHistory extends Component {
    state = {
        data : null,
        dataDetail : null
    }

    componentDidMount (){
        this.getDataTransaction()
    }

    getDataTransaction = () => {
        var id = localStorage.getItem('id')
        if(id){
            Axios.get(apiUrl + 'transactions?id_user=' + id)
            .then((res) => {
                console.log(res)
                this.setState({data : res.data})
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.dataDetail ? true : false}>
                    <ModalHeader>
                        Detail Transaction
                    </ModalHeader>
                    <ModalBody>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.dataDetail ? this.state.dataDetail.map((val,index) => {
                                    return(
                                        <tr>
                                            <td>{index+1}</td>
                                            <td><img src={val.product_image} width='50px' alt='product'/></td>

                                            <td>{val.product_name}</td>
                                            <td>{val.product_price}</td>
                                            <td>{val.qty}</td>
                                        </tr>
                                    )
                                }) : 'loading..'}
                            </tbody>
                        </table>
                    </ModalBody>
                    <ModalFooter>
                        <input type="button" value="close" onClick={() =>this.setState({dataDetail : null})}/>
                    </ModalFooter>
                </Modal>
                <div className="container py-5 text-center">
                        <h2 >
                            Transaction History
                        </h2>
                    <div className="row mt-5 justify-content-center px-2">
                        
                        <div className="col-md-8 rounded shadow">
                            <table className='table my-5'>
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Total Item</th>
                                        <th scope="col">Total Price</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.data ? 
                                        this.state.data.map((val,index) => {
                                            return(
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{moment(val.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                                    <td>{val.detail.length}</td>
                                                    <td>Rp. {val.totalPrice.toLocaleString('id-ID')}</td>
                                                    <td>{val.status}</td>
                                                    <td>{ val.status === 'paid' ? <input type="button" value="see detail" onClick={() => this.setState({dataDetail : val.detail})} className='btn btn-info'/> : <Link className='sporteens-link' to={'/checkout/' + val.id }><input type="button" value="pay now" className='btn btn-info'/> </Link>  }</td>
                                                </tr>
                                            )
                                        })
                                        :
                                        'loading..'
                                    }
                                </tbody>
                                <tfoot>

                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TransactionHistory
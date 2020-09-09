import React, { Component } from 'react'
import Axios from 'axios'
import apiUrl from '../supports/constants/apiUrl'

export class Statistics extends Component {
    state = {
        dataTrans : null,
        dataProducts : null,
        passiveUser : null
    }

    componentDidMount(){
        this.getDataStats()
        this.getDataProducts()
        
    }

    getDataStats = () => {
        Axios.get(apiUrl + "transactions")
        .then((res) => {
            var countSuccess = 0;
            var countPending = 0;
            var totalIncomeSuccess = 0;
            var totalIncomePending =0;
            var userActive = [];


            res.data.forEach((val) => {
                if(val.status === 'unpaid'){
                    countPending ++
                    totalIncomePending += val.totalPrice;
                }else{
                    countSuccess ++
                    totalIncomeSuccess += val.totalPrice
                }

                if(!(userActive.includes(val.id_user))) userActive.push(val.id_user)
                
            })

            var dataTrans = {countSuccess,countPending,totalIncomeSuccess,totalIncomePending,userActive}

            this.setState({dataTrans})
            this.getPassiveUser()
         
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getDataProducts = () => {
        Axios.get(apiUrl + 'products')
        .then((res) => {
            var countDraft = 0
            res.data.forEach((val) => {
                if(val.isDraft) countDraft ++
            })

            var countPublished = res.data.length - countDraft
            var data = {countDraft,countPublished}
            this.setState({dataProducts : data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getPassiveUser = () => {
        Axios.get(apiUrl + 'users')
        .then((res) => {
            var pasiveUser = res.data.length - this.state.dataTrans.userActive.length
            this.setState({passiveUser : pasiveUser})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        return (
           <div>
               <div className="container py-5">
                   <h2>Statistics Page</h2>
                   <div className="row mt-4">
                        <div className="col-md-3">
                            <div className="rounded border shadow p-4">
                                <h4 className='text-center'>Transactions</h4>
                                <p className='font-weight-bold'>Success</p>
                                <p>{this.state.dataTrans && this.state.dataTrans.countSuccess} Transactions</p>
                                <p className='font-weight-bold'>Pending</p>
                                <p>{this.state.dataTrans && this.state.dataTrans.countPending} Transactions</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="rounded border shadow p-4">
                                <h4 className='text-center'>Users</h4>
                                <p className='font-weight-bold'>Active</p>
                                <p>{this.state.dataTrans && this.state.dataTrans.userActive.length} Users</p>
                                <p className='font-weight-bold'>Passive</p>
                                <p>{this.state.passiveUser && this.state.passiveUser} Users</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="rounded border shadow p-4">
                                <h4 className='text-center'>Total Products</h4>
                                <p className='font-weight-bold'>Published</p>
                                <p>{this.state.dataProducts && this.state.dataProducts.countPublished} Items</p>
                                <p className='font-weight-bold'>Draft</p>
                                <p>{this.state.dataProducts && this.state.dataProducts.countDraft} Items</p>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="rounded border shadow p-4">
                                <h4 className='text-center'>Total Income</h4>
                                <p className='font-weight-bold'>Success</p>
                                <p>Rp. {this.state.dataTrans && this.state.dataTrans.totalIncomeSuccess.toLocaleString('id-ID')}</p>
                                <p className='font-weight-bold'>Pending</p>
                                <p>Rp. {this.state.dataTrans && this.state.dataTrans.totalIncomePending.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                        
                   </div>
               </div>
           </div>
        )
    }
}

export default Statistics
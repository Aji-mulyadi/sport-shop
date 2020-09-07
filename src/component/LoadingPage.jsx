import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
export class LoadingPage extends Component {
    render() {
        return (
            <div className='text-center p-5'>
                <div className='p-5'>
                    <div className='p-5'>
                        <Loader type='ThreeDots'color="#364f6b" height={60} width={60} />
                        <p className='sporteens-main-dark'>loading</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoadingPage
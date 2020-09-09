import {faMinus,faPlus,faShoppingCart,faTrash,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { UncontrolledTooltip } from "reactstrap";
import Axios from "axios";
import apiUrl from "../supports/constants/apiUrl";

class Cart extends Component {
  state = {
      dataCart : null,
      dataProduct : null,
  }
  componentDidMount(){
      this.getDataCart()
  }

  getDataCart = () => {
      var idUser = localStorage.getItem('id')
      if(idUser){

          // get data cart by id User
          Axios.get(apiUrl + "carts?id_user=" + idUser)
          .then((res) => {
              // apiurl/products?id=1&id=5
              // res.data = [{id_products, id_user, qty}]
              var url = 'products?'
              res.data.forEach((val) => {
                  url += 'id=' + val.id_product + '&'
              })
              console.log(url)

              
              
              console.log(res.data)

              this.setState({dataCart : res.data})

              // get data products
              Axios.get(apiUrl + url)
              .then((res) => {
                  // dapet data product
                  console.log(res.data)
                  this.setState({dataProduct : res.data})
              })
              .catch((err) => {
                  console.log(err)
              })
              
          })
          .catch((err) =>{ 
              console.log(err)
          })
      }
  }

  renderDataToJsx = () => {
      return this.state.dataCart.map((val,index) => {
          return(
              <div className="col-12 mb-5 border-bottom pb-4">
                <div className="row justify-content-between  h-100">
                  {/* CARt image section */}
                  <div className="col-4   ">
                    <img
                      src={this.state.dataProduct[index].image1}
                      alt=""
                      style={{
                        width: "170px",
                        height: "170px",
                      }}
                    />
                  </div>
                  {/* End of image Section */}

                  {/* Product qty section */}
                  <div className="col-7 cart-bg-color pb-4 pt-2 ">
                    <div className=" cart-title-font font-weight-bold">
                      {this.state.dataProduct[index].name}
                      <div className="text-danger">Rp.{this.state.dataProduct[index].price.toLocaleString('id-ID')}</div>
                    </div>
                    <div className="d-flex flex-column h-75  justify-content-end ">
                      <div className=" d-flex justify-content-between">
                        <span>
                          <button onClick={() => this.editQty('-',index)} className="btn btn-secondary rounded-circle">
                            <FontAwesomeIcon icon={faMinus}  />
                          </button>

                          <span className=" mx-2 product-list-title-font font-weight-bold text-success ">
                            {val.qty}
                          </span>

                          <button onClick={() => this.editQty('+',index)} className="btn btn-info rounded-circle">
                            <FontAwesomeIcon icon={faPlus}  size="1" />
                          </button>
                        </span>
                        <div>
                          <button
                            onClick = {() => this.onDeleteCart(val.id,index)}
                            className="btn btn-danger rounded-pill"
                            id="RemoveCart"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                          <UncontrolledTooltip
                            placement="top"
                            target="RemoveCart"
                            color="red"
                          >
                            Remove from your cart?
                          </UncontrolledTooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end of qty Section */}
                </div>
              </div>
          )
      })
  }


  editQty = (op,index) => {
    var qty = this.state.dataCart[index].qty
    var id = this.state.dataCart[index].id
    qty = op === '+' ? qty + 1 : qty -1

    if(qty === 0){
      this.onDeleteCart(id,index)
    }else{
      Axios.patch(apiUrl + 'carts/' + id, {qty : qty})
      .then((res) =>{ 
        if(res.status === 200){
          var data = this.state.dataCart
          data[index].qty = qty
          this.setState({dataCart : data})
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  onDeleteCart = (id,index) => {
    if(window.confirm('Are You Sure Want to delete this item ?')){
      Axios.delete(apiUrl + 'carts/' + id)
      .then((res) => {
        if(res.status === 200){
          var data = this.state.dataCart
          var dataProduct = this.state.dataProduct

          data.splice(index,1)
          dataProduct.splice(index,1)

          this.setState({dataCart : data,dataProduct : dataProduct})

        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }


  onCheckoutClick = () => {
    // {
    //   "id" : 1,
    //   "createdAt" : "09-07-2020",
    //   "totalPrice" : 5000000,
    //   "status" : "unpaid",
    //   "id_user" : 5,
    //   "details" : [
    //     {
    //       "product_name" : "Sepatu",
    //       "product_price" : 2000000,
    //       "product_image" : "url",
    //       "qty" : 3
    //     },
    //     {
    //       "product_name" : "Jersey Bola",
    //       "product_price" : 1000000,
    //       "product_image" : "url",
    //       "qty" : 1
    //     }
    //   ]
    // }



    const detail = this.state.dataCart.map((val,index) => {
      return {
        product_name : this.state.dataProduct[index].name,
        product_price : this.state.dataProduct[index].price,
        product_image : this.state.dataProduct[index].image1,
        qty : val.qty
      }
    })


    const data = {
      createdAt : new Date(),
      totalPrice : Number(this.refs.total.innerHTML.split('Rp')[1].split('.').join('')),
      status : 'unpaid',
      id_user : Number(localStorage.getItem('id')),
      detail : detail
    }


    Axios.post(apiUrl + 'transactions',data)
    .then((res) =>{ 
      if(res.status === 201){

        var idTransaction = res.data.id

        this.state.dataCart.forEach((val,index) => {
          Axios.delete(apiUrl + 'carts/' + val.id)
          .then((res) => {
            if(index === this.state.dataCart.length -1){
              console.log(res)
              alert('Add to cart success')
              window.location = '/checkout/' + idTransaction
            }
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
        })

       


        
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  getSummaryData = () => {
    var totalItem = 0
    var totalPrice = 0
    this.state.dataCart.forEach((val,index) => {
      totalPrice += val.qty * this.state.dataProduct[index].price
      totalItem += val.qty
    })

    return(
      <div
      className="col-md-5 d-flex border rounded flex-column justify-content-between pb-2 h-25 p-3  "
      
    >
      <h4 className="product-details-font-title font-weight-light sporteens-main-dark pt-2">
        Cart Summary{" "}
        (
          {totalItem}
        )
        <p ref='total' className="product-list-title-font font-weight-bold text-secondary mt-4">
          Total: Rp.
        {totalPrice.toLocaleString('id-ID')}
        </p>
      </h4>

      <div>
        <button onClick={this.onCheckoutClick} className="btn btn-info w-100 font-weight-bold rounded-pill">
          Checkout
        </button>
      </div>
    </div>
    )
  }


  render() {
    return (
      <div className="container pt-5">
        <h2 className="cart-heading-title sporteens-main-dark text-center">
          Your Cart <FontAwesomeIcon icon={faShoppingCart} />
        </h2>
        <div className="row justify-content-between py-5   ">
          {/* Cart item and Qty Section */}
          <div className="col-md-6">
            <div className="row  ">
              {this.state.dataProduct === null || this.state.dataCart === null ? 'loading...' : this.renderDataToJsx()}
            </div>
          </div>
          {this.state.dataProduct === null || this.state.dataCart === null ? 'loading...' : this.getSummaryData() }
        </div>
      </div>
    );
  }
}

export default Cart;
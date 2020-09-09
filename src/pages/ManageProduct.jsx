import React, { Component } from "react";
import apiUrl from "./../supports/constants/apiUrl";
import Axios from "axios";

class manageProduct extends Component {
  state = {
    data: null,
    showForm: false,
    selectedId: null,
  };
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    Axios.get(apiUrl + "products")
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(err));
  };

  handleRemove = (id, index) => {
    if (window.confirm("are you sure want to delete this item ?")) {
      Axios.delete(apiUrl + "products/" + id)
        .then((res) => {
          if (res.status === 200) {
            var data = this.state.data;

            data.splice(index, 1);

            this.setState({ data: data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  onSubmitClick = () => {
    var produkname = this.refs.productName.value;
    var brand = this.refs.brand.value;
    var category = this.refs.category.value;
    var price = this.refs.price.value;
    var discount = this.refs.discount.value;
    var stock = this.refs.stock.value;
    var image = this.refs.image.value;
    // cek ada yang kosong atau enggak
    if (
      produkname &&
      brand &&
      category &&
      price &&
      discount &&
      stock &&
      image
    ) {
      Axios.post(apiUrl + "products", {
        name: produkname,
        brand: brand,
        category: category,
        price: price,
        discount: discount,
        stock: stock,
        image1: image,
      })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            alert("Add Data Success");
            this.refs.username.value = "";
            this.refsproductName.value = "";
            this.refs.brand.value = "";
            this.refs.price.value = "";
            this.refs.discount.value = "";
            this.refs.stock.value = "";
            this.refs.image.value = "";
            this.getData();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Form Harus diisi Semuanya");
    }
  };

  onSaveBtnClick = () => {
    var produkname = this.refs.productnameEdit.value;
    var brand = this.refs.brand.value;
    var category = this.refs.category.value;
    var price = this.refs.price.value;
    var discount = this.refs.discount.value;
    var stock = this.refs.stock.value;
    var image = this.refs.image.value;

    if (
      produkname &&
      brand &&
      category &&
      price &&
      discount &&
      stock &&
      image
    ) {
      Axios.patch(apiUrl + "products/" + this.state.selectedId, {
        name: produkname,
        brand: brand,
        category: category,
        price: price,
        discount: discount,
        stock: stock,
        image1: image,
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert("edit data success");
            this.setState({ selectedId: null });
            this.getData();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("form gak boleh kosong");
    }
  };
  addDataDraft = (id) => {
    if (window.confirm("are you sure want to move this item to draft ?")) {
      Axios.get(apiUrl + "products/" + id)
        .then((res) => {
          Axios.post(apiUrl + "drafts/", res.data)
            .then((res) => {
              alert("data has been transfered to cart");
              Axios.delete(apiUrl + "products/" + id)
                .then((res) => {
                  console.log(res.data);
                  this.getData();
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    if (this.state.data === null) {
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div className="container pt-5 ">
        <input
          type="button"
          className="btn btn-primary mb-5 mx-auto"
          onClick={() => this.setState({ showForm: true })}
          value="add new data"
        />
        <table className="table-bordered mt-2 ">
          <thead className="table-primary text-white text-center">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">product Name</th>
              <th scope="col">brand</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">discount</th>
              <th scope="col">Stock</th>
              <th scope="col">Image</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
              <th scope="col">Add Data to draft</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {this.state.data.map((v, i) => {
              if (this.state.selectedId === v.id) {
                return (
                  <tr key={i}>
                    <td>{v.id}</td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={v.name}
                        ref="productnameEdit"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={v.brand}
                        ref="brand"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={v.category}
                        ref="category"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={v.price}
                        ref="price"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={v.discount}
                        ref="discount"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={v.stock}
                        ref="stock"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={v.image1}
                        ref="image"
                      />
                    </td>
                    <td>
                      <input
                        type="button"
                        value="cancel"
                        onClick={() => this.setState({ selectedId: null })}
                        className="btn btn-danger"
                      />
                    </td>
                    <td>
                      <input
                        type="button"
                        value="save"
                        className="btn btn-success"
                        onClick={this.onSaveBtnClick}
                      />
                    </td>
                  </tr>
                );
              }
              return (
                <tr key={i}>
                  <th scope="row">{v.id}</th>
                  <td>{v.name}</td>
                  <td>{v.brand}</td>
                  <td>{v.category}</td>
                  <td>{v.price}</td>
                  <td>{v.discount}</td>
                  <td>{v.stock}</td>
                  <td>
                    <img
                      style={{ height: "100px", width: "100px" }}
                      src={v.image1}
                      alt="ja"
                    ></img>
                  </td>

                  <td>
                    <button
                      onClick={() => this.handleRemove(v.id, i)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary px-4"
                      onClick={() => this.setState({ selectedId: v.id })}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary px-4"
                      onClick={() => this.addDataDraft(v.id)}
                    >
                      addData to draft
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {this.state.showForm ? (
          <div className="row mt-5 justify-content-center fixed-bottom mb-5">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <input
                    type="text"
                    placeholder="Produkname"
                    className="form-control"
                    ref="productName"
                  />
                  <input
                    type="text"
                    placeholder=" enter newBrand"
                    className="form-control my-3"
                    ref="brand"
                  />
                  <input
                    type="text"
                    placeholder="category"
                    className="form-control"
                    ref="category"
                  />
                  <input
                    type="text"
                    placeholder=" Price"
                    className="form-control my-3"
                    ref="price"
                  />
                  <input
                    type="text"
                    placeholder=" discount"
                    className="form-control my-3"
                    ref="discount"
                  />
                  <input
                    type="text"
                    placeholder=" stock"
                    className="form-control my-3"
                    ref="stock"
                  />
                  <input
                    type="text"
                    placeholder=" Image"
                    className="form-control my-3"
                    ref="image"
                  />
                  <input
                    type="button"
                    value="Submit"
                    className="btn btn-info mt-4"
                    onClick={this.onSubmitClick}
                  />
                  <input
                    type="button"
                    onClick={() => this.setState({ showForm: false })}
                    value="Close Form"
                    className="btn btn-danger mt-4"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default manageProduct;
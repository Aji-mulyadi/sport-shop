import React, { Component } from "react";
import Axios from "axios";
import ApiUrl from "./../supports/constants/apiUrl";

class statictic extends Component {
  state = {
    success: null,
    pending: null,
    activeUser: null,
    pasifUser: null,
    active: null,
    draft: null,
    success1: null,
    pending1: null,
    users: null,
    product: null,
  };
  componentDidMount() {
    this.getAllData();
  }

  getAllData = () => {
    Axios.get(ApiUrl + "transactions")
      .then((res) => {
        var countSucess = 0;
        var pending = 0;
        res.data.map((v) => (v.status === "paid" ? countSucess++ : pending++));
        this.setState({ success: countSucess, pending: pending });
        var unpaid = 0;
        var paid = 0;

        res.data.map((v) => (v.status.includes("unpaid") ? unpaid++ : paid++));
        res.data.forEach((v) =>
          v.status.includes("unpaid")
            ? (unpaid += v.totalPrice)
            : (paid += v.totalPrice),
        );
        console.log(paid);
        console.log(unpaid);
        this.setState({ success1: paid, pending1: unpaid });
      })
      .catch((err) => console.log(err));
    Axios.get(ApiUrl + "users")
      .then((res) => {
        var id = [];
        res.data.map((v) => id.push(v.id));
        var active = 0;
        var pasif = 0;
        id.forEach((v) => {
          return Axios.get(ApiUrl + "transactions?id_user=" + v).then((res) => {
            res.data.length > 0 ? active++ : pasif++;
            this.setState({ activeUser: active, pasifUser: pasif });
          });
        });
      })
      .catch((err) => console.log(err));
    Axios.get(ApiUrl + "products")
      .then((res) => {
        this.setState({ active: res.data.length });
      })
      .catch((err) => console.log(err));
    Axios.get(ApiUrl + "drafts")
      .then((res) => {
        this.setState({ draft: res.data.length });
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="container py-5" style={{ height: "120vh" }}>
        <h1>Statistic Page</h1>
        <div className="row">
          <div className="col-3">
            <h2>Transaction</h2>
            <p className="font-weight-bold">success</p>
            <div className="font-weight-bold">{this.state.success}</div>
            <p className="font-weight-bold">pending</p>
            <div className="font-weight-bold">{this.state.pending}</div>
          </div>
          <div className="col-3">
            <h2>User</h2>
            <p className="font-weight-bold">active user</p>
            <div className="font-weight-bold">{this.state.activeUser}</div>
            <p className="font-weight-bold">Pasif user</p>
            <div className="font-weight-bold">{this.state.pasifUser}</div>
          </div>
          <div className="col-3">
            <h2>Total product</h2>
            <p className="font-weight-bold"> product</p>
            <div className="font-weight-bold">{this.state.active}</div>
            <p className="font-weight-bold">Draft</p>
            <div className="font-weight-bold">{this.state.draft}</div>
          </div>
          <div className="col-3">
            <h2>Total income</h2>
            <p className="font-weight-bold">success</p>
            <div className="font-weight-bold">Rp.{this.state.success1}</div>
            <p className="font-weight-bold">pending</p>
            <div className="font-weight-bold">Rp.{this.state.pending1}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default statictic;
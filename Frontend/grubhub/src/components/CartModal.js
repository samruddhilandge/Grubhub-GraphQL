import React, { Component } from "react";
import { Route } from "react-router-dom";
import ItemTile from "./ItemTile";
import axios from "axios";
import { rooturl } from "../config";
//add restaurant tile dynamically according to the fetched data from the database
class CartModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bag: [],
      total: 0
    };
    this.remove = this.remove.bind(this);
    this.onOrder = this.onOrder.bind(this);
  }

  componentWillMount() {}

  remove(item_id) {
    const data = {
      buyer_id: localStorage.getItem("buyer_id"),
      item_id: item_id
    };
    axios
      .post("http://" + rooturl + ":3001/removefrombag", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Response data:", response.data);

          alert("Item removed from your Bag");
          window.location.reload();
        }
        if (response.status === 202) {
          console.log("in 202 create");
          this.setState({
            flag1: true
          });
        }
      });
  }

  onOrder() {
    const data1 = {
      bag1: this.state.bag,
      buyer_id: localStorage.getItem("buyer_id"), //THIS IS STATIC
      buyer_name: localStorage.getItem("buyer_name"),
      buyer_address: localStorage.getItem("buyer_address")
    };
    console.log("buyer_id:", data1.buyer_id);

    axios
      .post("http://" + rooturl + ":3001/orderconfirm", data1)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Response data:", response.data);

          axios
            .post("http://" + rooturl + ":3001/afterorderconfirm", data1)
            .then(response => {
              console.log(
                "Status Code in after order confirm: ",
                response.status
              );
              if (response.status === 200) {
                console.log("Response data:", response.data);
              }
              if (response.status === 202) {
                console.log("in 202 create");
                this.setState({
                  flag1: true
                });
              }
            });
        }
        if (response.status === 202) {
          console.log("in 202 create");
          this.setState({
            flag1: true
          });
        }

        alert("Order Condfirmed");
        window.location.reload();
      });
  }

  render() {
    return (
      <div class="container">
        <div class="modal fade" id="cartModal">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">My Bag</h4>
                <br />
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                {this.state.bag.map(b => {
                  this.state.total = b.price * b.quantity + this.state.total;

                  return (
                    <div>
                      <h5>
                        {b.item_name}- ${b.price}---->Quantity:{b.quantity}
                      </h5>
                      <div
                        style={{ display: "inline-block", marginRight: "0" }}
                      >
                        <button
                          onClick={() => this.remove(b.item_id)}
                          class="btn btn-secondary m-2 btn-sm"
                          style={{ fontWeight: "bolder" }}
                        >
                          Remove from Bag
                        </button>
                      </div>
                    </div>
                  );
                })}
                <h4>
                  Your total is::{Math.round(this.state.total * 100) / 100}
                </h4>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  onClick={this.onOrder}
                  class="btn btn-danger"
                  data-dismiss="modal"
                  style={{ fontWeight: "bolder" }}
                >
                  Order Confirm
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  style={{ fontWeight: "bolder" }}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartModal;

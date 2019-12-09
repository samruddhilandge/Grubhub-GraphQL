import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavbarSearch from "./NavbarSearch";
import axios from "axios";
import ItemTile from "./ItemTile";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { rooturl } from "../config";
class PastBuyerOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      restaurant_ids: []
    };
  }

  componentWillMount() {
    const data = {
      //restaurant_id:localStorage.getItem('restaurant_id'),
      buyer_id: localStorage.getItem("buyer_id") //HERE ADDED STATICALLY, ADD AFTER LOGIN THE CURRENT RESTAURANT'S ID
    };

    axios
      .post("http://" + rooturl + ":3001/pastbuyerorder", data) //send restaurant id, to fetch data for that particular restaurant
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          //console.log("Owner Orders:", response.data);
          //console.log("Response data rows:", response.data.restaurant_name);
          const orders = response.data;
          //console.log(localStorage.getItem('restaurant_id'));
          console.log("orders:", orders);
          this.setState({ orders });
        }
        if (response.status === 202) {
          console.log("in 202 create");
          this.setState({
            flag1: true
          });
        }
      });
  }

 

  render() {
    {
      this.state.orders.map(order => {
       
        if (!this.state.restaurant_ids.includes(order.restaurant_id))
          this.state.restaurant_ids.push(order.restaurant_id);
        console.log("restaurant_ids:", this.state.restaurant_ids);
      });
    }

    return (
      <div>
        <NavbarSearch />

        <div>
          <h2 style={{ fontFamily: "berlin sans fb", textAlign: "center" }}>
            My Orders
          </h2>
          <Link to="/pastbuyerorder">
            <button
              type="submit"
              class="btn btn-primary m-2 btn-sm"
              style={{ fontWeight: "bolder", float: "right" }}
            >
              Past Orders
            </button>
            <span></span>
          </Link>
        </div>

        <div>
          {this.state.restaurant_ids.map(restaurant_id => {
          
            return (
              <div id="item-tile1">
                <h3>Restaurant ID:{restaurant_id}</h3>

                {this.state.orders.map(order => {
                  if (order.restaurant_id === restaurant_id) {
                    return (
                      <div>
                        <h5>
                          ---->{order.item_name} -Qty.({order.quantity})
                        </h5>
                        <h6 style={{ color: "grey" }}>{order.status}</h6>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default PastBuyerOrder;

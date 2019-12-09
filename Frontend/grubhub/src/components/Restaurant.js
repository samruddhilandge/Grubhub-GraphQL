import React, { Component } from "react";
import { Route } from "react-router-dom";
import NavbarSearch from "./NavbarSearch";
import ItemTile from "./ItemTile";
import { rooturl } from "../config";
import axios from "axios";
import Modal from "./Modal";
import CartModal from "./CartModal";

class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: localStorage.getItem("restaurant_id"),
      name: localStorage.getItem("restaurant_name"),
      restaurant: [],
      bag: [],
      quantity: 0,
      imageView: []
    };
    this.onQuantityChange = this.onQuantityChange.bind(this);
  }

  componentWillMount() {
    const data = {
      id: this.state.id
    };
    axios
      .post("http://" + rooturl + ":3001/restaurant", data)
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Response data:", response.data);
          const restaurant = response.data;
          console.log("restaurant:", restaurant);
          this.setState({ restaurant });
        }
        if (response.status === 202) {
          console.log("in 202 create");
          this.setState({
            flag1: true
          });
        }
      });
  }

  onQuantityChange(e) {
    this.setState({
      quantity: e.target.value
    });
  }

  addToBag(item_name, item_id, price, id) {
    const data1 = {
      item_name: item_name,
      item_id: item_id,
      price: price,
      restaurant_id: id,
      quantity: this.state.quantity,
      buyer_id: localStorage.getItem("buyer_id")
    };
    console.log("DATAAABYEERR ID", data1.buyer_id);
    axios.post("http://" + rooturl + ":3001/addtobag", data1).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        alert("Item added to bag");
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

  render() {
    return (
      <div>
        <CartModal />
        <NavbarSearch />
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundImage: `url(${"image.jpg"})`
          }}
        ></div>

        <div>
          <h2 style={{ fontFamily: "berlin sans fb", marginLeft: 200 }}>
            {this.state.name}
          </h2>

          <h4 style={{ fontFamily: "berlin sans fb", marginLeft: 200 }}>
            Menu
          </h4>
        </div>
        <div>
          {this.state.restaurant.map(restaurant => {
            //"http://www.tkspizzaonline.com/Images/pizza.jpg"
            return (
              <div>
                <h4>{restaurant.section_name}</h4>
                <div id="item-tile">
                  <div
                    style={{ display: "inline-block", verticalAlign: "top" }}
                  >
                    <img
                      src="http://www.tkspizzaonline.com/Images/pizza.jpg"
                      height="100"
                      width="100"
                    />
                  </div>
                  <div style={{ display: "inline-block" }}>
                    <h4 id="item-detail">
                      {restaurant.item_name}- ${restaurant.price}
                    </h4>
                    <h6 style={{ color: "grey" }}>{restaurant.description}</h6>
                    <div style={{ display: "inline-block", marginRight: "0" }}>
                      <button
                        class="btn btn-danger m-2 btn-sm"
                        onClick={() =>
                          this.addToBag(
                            restaurant.item_name,
                            restaurant._id,
                            restaurant.price,
                            restaurant.restaurant_id
                          )
                        }
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Restaurant;

import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import ItemTile from "./ItemTile";
import Section from "./TempSection";
import AddSection from "./AddSection";
import DeleteSection from "./DeleteSection";
import { Redirect } from "react-router";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import { rooturl } from "../config";
//add restaurant tile dynamically according to the fetched data from the database
class OwnerMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      length: "",
      itemFlag: false,
      imageView: []
    };

    this.addItem = this.addItem.bind(this);
    this.removeItemFromSection = this.removeItemFromSection.bind(this);
  }

  removeItemFromSection(item_id) {
    const data = {
      item_id: item_id
    };
    console.log("Item_id::", item_id);
    axios
      .post("http://" + rooturl + ":3001/removeitemfromsection", data) //similar to buyers restaurant page
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Response data:", response.data);
          alert("Item removed from the section");

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

  updateItem(item_id) {
    const data = {
      item_id: item_id
    };
    localStorage.setItem("item_id", item_id);
    console.log("Item_id::", item_id);
    axios
      .post("http://" + rooturl + ":3001/updateItem", data) //similar to buyers restaurant page
      .then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Response data:", response.data);
          alert("Item updated");

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

  // componentWillMount(){

  //     const data={
  //         restaurant_id:localStorage.getItem("restaurant_id")
  //     }
  //     console.log("menu data:",data.restaurant_id);
  //     axios.post('http://'+rooturl+':3001/menu',data)  //similar to buyers restaurant page
  //     .then(response => {
  //         console.log("Status Code : ",response.status);
  //         if(response.status === 200){

  //             // this.setState({
  //             //     flag2 : true
  //             // })
  //             console.log("Response data:", response.data);
  //             //console.log("Response data rows:", response.data.restaurant_name);
  //             const menu=response.data;
  //             console.log("Menu:",menu);
  //             // this.setState(
  //             //     {menu}
  //             // );
  //             this.setState({
  //                 menu : this.state.menu.concat(response.data) ,
  //                 length:response.data.length
  //             });
  //             /* console.log("this.   state.restaurant:",this.state.restaurant);
  //             console.log("res_id:",this.state.restaurant[0].restaurant_id);
  //             console.log("res_name:",this.state.restaurant[0].restaurant_name);
  //             console.log("owner_name:",this.state.restaurant[0].owner_id); */
  //             this.state.menu.map(menudata =>
  //             {
  //                     // var dataimage =
  //                     // {
  //                     //     path:property.image,
  //                     //     name:property.imagename
  //                     // }
  //                     console.log(menudata.imagelocation);
  //                     axios.post('http://'+rooturl+':3001/download/'+menudata.imagelocation)
  //                     .then(response => {
  //                         console.log("Imgae Res : ",response);
  //                         let imagePreview = 'data:image/jpg;base64, ' + response.data;
  //                          this.setState({
  //                             imageView: this.state.imageView.concat(imagePreview)
  //                          })

  //                     });
  //                 });

  //         }
  //         if(response.status === 202){
  //             console.log("in 202 create")
  //             this.setState({
  //                 flag1 : true
  //             })
  //         }

  //     });
  // }

  addItem() {
    this.setState({
      itemFlag: true
    });
  }

  render() {
    var i = -1;
    let redirectVar1 = null;

    let redirectVar = null;
    if (this.state.itemFlag) {
      redirectVar = <Redirect to="/additem" />;
    }
    return (
      <div>
        {redirectVar1}
        {redirectVar}
        <AddSection />
        <DeleteSection />
        <Navbar />
        <div>
          <Link to="/additem">
            <button
              type="submit"
              class="btn btn-primary m-2 btn-sm"
              style={{ fontWeight: "bolder", float: "right" }}
            >
              Add Item
            </button>
            <span></span>
          </Link>

          <button
            type="submit"
            class="btn btn-primary m-2 btn-sm"
            style={{ fontWeight: "bolder", float: "right" }}
            data-toggle="modal"
            data-target="#AddSection"
          >
            Add Section
          </button>
          <span></span>
          <button
            type="submit"
            class="btn btn-primary m-2 btn-sm"
            style={{ fontWeight: "bolder", float: "right" }}
            data-toggle="modal"
            data-target="#DeleteSection"
          >
            Delete Section
          </button>
          <span></span>
        </div>
        <div>
          <h2 style={{ fontFamily: "berlin sans fb", textAlign: "center" }}>
            My Menu
          </h2>
        </div>

        <div>
          {this.state.menu.map(item => {
            i = i + 1;
            return (
              <div>
                {/* {"http://www.tkspizzaonline.com/Images/pizza.jpg" } */}
                <div id="item-tile">
                  <h4>{item.section_name}</h4>
                  <div
                    style={{ display: "inline-block", verticalAlign: "top" }}
                  >
                    <img
                      src={this.state.imageView[i]}
                      height="100"
                      width="100"
                    />
                  </div>
                  <div style={{ display: "inline-block" }}>
                    <h6 id="item-detail">
                      {item.item_name}- ${item.price}
                    </h6>
                    <div style={{ display: "inline-block", marginRight: "0" }}>
                      <Link to="/updateitem">
                        <button
                          type="submit"
                          onClick={() => this.updateItem(item._id)}
                          class="btn btn-danger m-2 btn-sm"
                          style={{ float: "right" }}
                        >
                          Update Item
                        </button>
                        <span></span>
                      </Link>
                      <button
                        type="submit"
                        onClick={() => this.removeItemFromSection(item._id)}
                        class="btn btn-secondary m-2 btn-sm"
                        style={{ float: "right" }}
                      >
                        Remove Item from this section
                      </button>
                      <span></span>
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

export default OwnerMenu;

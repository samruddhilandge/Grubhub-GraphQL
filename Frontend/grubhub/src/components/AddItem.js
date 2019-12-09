import React, { Component } from "react";
import { Route } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import ItemTile from "./ItemTile";
import Section from "./TempSection";
import { rooturl } from "../config";
import { graphql } from "react-apollo";

import { addItem } from "../mutations/mutations";

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item_name: "",
      price: "",
      section_name: "",
      sectionsAvailable: [],
      restaurant_id: localStorage.getItem("restaurant_id"),
      cuisine: "",
      description: "",
      selectedFile: "",
      imageView: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onUpload = this.onUpload.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const data = {
      item_name: this.state.item_name,
      description: this.state.description,
      price: this.state.price,
      section_name: this.state.section_name,
      restaurant_id: this.state.restaurant_id,
      cuisine: this.state.cuisine
    };
    this.props
      .mutate({ variables: data })
      .then(res => {
        alert("Item Added Successfully");
      })
      .catch(err => {
        console.log(err);
      });
  }

  onImageChange = e => {
    if (e.target.name == "selectedFile") {
      this.setState({
        selectedFile: e.target.files[0]
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleGetPhoto = e => {
    axios
      .post("http://" + rooturl + ":3001/" + this.state.imagelocation)
      .then(response => {
        console.log("Image Response : ", response.data);
        let imagePreview = "data:image/jpg;base64, " + response.data;
        this.setState({
          imageView: imagePreview
        });
        console.log("imageview");
        console.log(this.state.imageView);
      });
  };

  onUpload(e) {
    e.preventDefault();
    const { buyer_id, description, selectedFile } = this.state;
    let formData = new FormData();

    formData.append("description", description);
    formData.append("buyer_id", buyer_id);
    formData.append("selectedFile", selectedFile);

    axios
      .post("http://" + rooturl + ":3001/itemPhoto", formData)
      .then(response => {
        console.log("here is the response body", response.body);
        console.log("here is the response data", response.data);
      });
  }

  render() {
    console.log("section selected:", this.state.section);
    const { description, selectedFile } = this.state;

    return (
      <div>
        <Navbar />
        <div>
          <h2 style={{ fontFamily: "berlin sans fb", textAlign: "center" }}>
            Add a New Item to your Menu!
          </h2>
        </div>

        <div class="profile-main-div">
          <div class="panel">
            <div>
              <form onSubmit={this.onUpload}>
                <img
                  src={this.state.imageView}
                  height="200px"
                  width="200px"
                  style={{ border: "3px solid grey" }}
                />

                <input
                  type="file"
                  name="selectedFile"
                  onChange={this.onImageChange}
                />
                <button type="submit">Upload my Profile Photo</button>
              </form>
            </div>

            <div class="form-group">
              <input
                onChange={this.onChange}
                value={this.state.item_name}
                type="text"
                class="form-control"
                name="item_name"
                placeholder="Item Name"
              />
              <div style={{ color: "red" }}>{this.state.nameError}</div>
            </div>
            <div class="form-group">
              <input
                onChange={this.onChange}
                value={this.state.description}
                type="text"
                class="form-control"
                name="description"
                placeholder="Description"
              />
              <div style={{ color: "red" }}>{this.state.emailError}</div>
            </div>
            <div class="form-group">
              <input
                onChange={this.onChange}
                value={this.state.price}
                type="text"
                class="form-control"
                name="price"
                placeholder="Price"
              />
              <div style={{ color: "red" }}>{this.state.passwordError}</div>
            </div>
            <div class="form-group">
              <input
                onChange={this.onChange}
                value={this.state.cuisine}
                type="text"
                class="form-control"
                name="cuisine"
                placeholder="Cuisine"
              />
              <div style={{ color: "red" }}>{this.state.passwordError}</div>
            </div>
            <div class="form-group">
              <input
                onChange={this.onChange}
                value={this.state.section_name}
                type="text"
                class="form-control"
                name="section_name"
                placeholder="Section Name"
              />
              <div style={{ color: "red" }}>{this.state.passwordError}</div>
            </div>

            <button
              onClick={this.onSubmit}
              class="btn btn-danger"
              style={{ fontWeight: "bolder" }}
            >
              Add
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

AddItem = graphql(addItem)(AddItem);
export default AddItem;

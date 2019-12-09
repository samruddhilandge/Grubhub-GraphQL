import React, { Component } from "react";
import { Route } from "react-router-dom";
import ItemTile from "./ItemTile";
import axios from "axios";
import cookie from "react-cookies";
import { rooturl } from "../config";
import { graphql } from "react-apollo";

import { addSection } from "../mutations/mutations";

class AddSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      section_name: ""
    };

    this.addSection = this.addSection.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      section_name: e.target.value
    });
  }

  addSection() {
    const data1 = {
      section_name: this.state.section_name,
      restaurant_id: localStorage.getItem("restaurant_id")
    };
    this.props
      .mutate({ variables: data1 })
      .then(res => {
        alert("Section Added Successfully");
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div class="container">
        <div class="modal fade" id="AddSection">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Add Section</h4>
                <br />
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                <div class="form-group">
                  <input
                    onChange={this.onChange}
                    type="text"
                    class="form-control"
                    name="section_name"
                    placeholder="Section Name"
                  />
                </div>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  onClick={this.addSection}
                  class="btn btn-danger"
                  data-dismiss="modal"
                  style={{ fontWeight: "bolder" }}
                >
                  Add Section
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

AddSection = graphql(addSection)(AddSection);
export default AddSection;

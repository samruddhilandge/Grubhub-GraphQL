import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import RestaurantTile from './RestaurantTile';
import ItemTile from './ItemTile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import axios from 'axios';
import {rooturl} from '../config';
import {SAVE} from '../redux/constants/action-types';
import { graphql } from "react-apollo";
import { updateBuyerProfile } from "../mutations/mutations";

class BuyerProfile extends Component {

    constructor(props){

        super(props);

        this.state={
            name:'',
            email:'',
            description: '',
            selectedFile: '',
            imageView : '',
            buyer:[],
            buyer_id:localStorage.getItem('buyer_id')
        }
        this.onChange=this.onChange.bind(this);
        this.onSave=this.onSave.bind(this);
        
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    // componentWillMount(){
    //     const data={
    //         buyer_id:localStorage.getItem('buyer_id')
    //     }
    // }

    onSave(){
        const data={
            buyer_id:localStorage.getItem('buyer_id'),
            name:this.state.name,
            email:this.state.email
        }

        this.props
        .mutate({ variables: data })
        .then(res => {
            console.log("RESS:",res)
            alert("Profile Updated successfully")
         
        })
        .catch(err => {
          console.log(err);
        });
       
    }
    

    render(){
       
        return(
            <div>
                <NavbarSearch/>

                <br/><br/>
                <h2 style={{fontFamily:"berlin sans fb",textAlign:"center"}}>My Profile</h2>
                <div class="profile-main-div">
                <div class="panel">
                <div class="form-group">
                                <input onChange = {this.onChange} value={this.state.name} type="text" class="form-control" name="name" placeholder="Name"/>
                                <div style={{color:"red"}}>{this.state.nameError}</div>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} value={this.state.email} type="text" class="form-control" name="email" placeholder="Email"/>
                                <div style={{color:"red"}}>{this.state.emailError}</div>
                            </div>
                           
                            <button onClick = {this.onSave} class="btn btn-danger" style={{fontWeight:"bolder"}}>Save Changes</button><br/><br/>
                   
                </div>
                </div>
            </div>
        )
    }
}



//BuyerProfile = graphql(updateBuyerProfile)(BuyerProfile);
export default BuyerProfile;





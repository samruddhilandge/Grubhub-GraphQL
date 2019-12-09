import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './Navbar';
import RestaurantTile from './RestaurantTile';
import ItemTile from './ItemTile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import {rooturl} from '../config';

import axios from 'axios';
const mapStateToProps = state =>{
    console.log(state);
    return {
        registered:state.registered
    }
}

class OwnerProfile extends Component {

    constructor(props){

        super(props);

        this.state={
            restaurant_id:localStorage.getItem('restaurant_id'),
            name:'',
            email:'',
            restaurant_name:'',
            owner:[],
            cuisine:''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    componentWillMount(){
        
        const data={
            restaurant_id:localStorage.getItem('restaurant_id')

        }
        axios.post('http://'+rooturl+':3001/ownerprofile',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                
              
                console.log("Response data:", response.data);
               
                const owner=response.data;
                console.log("owner:",owner);
                this.setState(
                    {owner}
                );

                this.setState({
                    name:response.data[0].name,
                    email:response.data[0].email,
                    phone:response.data[0].phone,
                    restaurant_name:response.data[0].restaurant_name,
                    cuisine:response.data[0].cuisine
                })
      
                
            }
            if(response.status === 202){
                console.log("in 202 create")
                this.setState({
                    flag1 : true
                })
            }
    
        });
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const data={
            restaurant_id:localStorage.getItem('restaurant_id'),
            name:this.state.name,
            email:this.state.email,
            cuisine:this.state.cuisine,
            phone:this.state.phone,
            restaurant_name:this.state.restaurant_name
        }
           
           axios.post('http://'+rooturl+':3001/updateownerprofile',data)  
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    
                    console.log("Response data:", response.data);
        
                    alert("Owner Profile Successfully updated");
                }
                if(response.status === 202){
                    console.log("in 202 create")
                    this.setState({
                        flag1 : true
                    })
                }
        
            });
     }


    render(){
        let redirectVar=null;
    
        return(
            <div>
                {redirectVar}
                <Navbar/>

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
                  
                            <div class="form-group">
                                <input onChange = {this.onChange} value={this.state.restaurant_name} type="text" class="form-control" name="restaurant_name" placeholder="Restaurant Name"/>
                                <div style={{color:"red"}}>{this.state.passwordError}</div>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} value={this.state.cuisine} type="text" class="form-control" name="cuisine" placeholder="Cuisine"/>
                                <div style={{color:"red"}}>{this.state.passwordError}</div>
                            </div>
                            <button onClick = {this.onSubmit} class="btn btn-danger" style={{fontWeight:"bolder"}}>Save Changes</button><br/><br/>
                   
                </div>
                </div>
            </div>
        )
    }
}

export default OwnerProfile;

// const mapDispatchStateToProps = dispatch => {
   
//     return {
//         save : () => {
           
//                     dispatch({type: SAVE})
        
//         }
//     }
    
// }
// export default connect(mapStateToProps,mapDispatchStateToProps)(OwnerProfile);
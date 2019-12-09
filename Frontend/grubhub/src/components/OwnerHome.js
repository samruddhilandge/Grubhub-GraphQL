import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import ItemTile from './ItemTile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
//const BUYER_SIGNUP="BUYER_SIGNUP";
import {OWNER_LOGOUT} from '../redux/constants/action-types';
import MessageToBuyer from './MessageToBuyer';
import cookie from 'react-cookies';
import {rooturl} from '../config';


//add restaurant tile dynamically according to the fetched data from the database
class OwnerHome extends Component {

    constructor(props){
        super(props);

        this.state={
            buyer_ids:[],
            orders:[],
            status:''
            
        }
        //this.cancelOrder=this.cancelOrder.bind(this);
        this.onChange=this.onChange.bind(this);
    }

    
    // componentWillMount(){

    //     const data={
    //         restaurant_id:localStorage.getItem('restaurant_id'),
    //         // buyer_id:1   //HERE ADDED STATICALLY, ADD AFTER LOGIN THE CURRENT RESTAURANT'S ID
    //     }
        

    //     axios.post('http://'+rooturl+':3001/ordersowner',data)  //send restaurant id, to fetch data for that particular restaurant
    //     .then(response => {
    //         console.log("Status Code : ",response.status);
    //         if(response.status === 200){
               
    //             //console.log("Owner Orders:", response.data);
    //             //console.log("Response data rows:", response.data.restaurant_name); 
    //             const orders=response.data;
    //             console.log(localStorage.getItem('restaurant_id'));
    //             console.log("orders:",orders);
    //             this.setState(
    //                 {orders}
    //             )
                
    //         }
    //         if(response.status === 202){
    //             console.log("in 202 create")
    //             this.setState({
    //                 flag1 : true
    //             })
    //         }
    
    //     });

    // }


    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onSave(buyer_id,item_id){
       const data={
            status:this.state.status,
            buyer_id:buyer_id,
            restaurant_id:localStorage.getItem('restaurant_id'),
            item_id:item_id
        }
        axios.post('http://'+rooturl+':3001/statusorder',data)  //send restaurant id, to fetch data for that particular restaurant
        .then(response => {
            console.log("Status Code : ",response.status);
            
            if(response.status === 200){
               alert("Status successfully changed");
                //console.log("Owner Orders:", response.data);
                //console.log("Response data rows:", response.data.restaurant_name);
            }
            if(response.status === 202){
                console.log("in 202 create")
                this.setState({
                    flag1 : true
                })
            }
    
        });
    }
    

    onMessage(buyer_id){
        localStorage.setItem('buyer_id_message',buyer_id);
        console.log("In onMessage of Owner Home");
        console.log("Buyer_id_message:",localStorage.getItem('buyer_id_message'));
     }




    render(){

        var rest_name = localStorage.getItem("restaurant_name");
        console.log('section selected:',this.state.status);
        let redirectVar=null;
  

        {this.state.orders.map(order => {
          
            if(!this.state.buyer_ids.includes(order.buyer_id))
            this.state.buyer_ids.push(order.buyer_id)
            console.log("buyer_ids:",this.state.buyer_ids);
           })

           }

        return(
            <div>
                {redirectVar}
                <Navbar/>
                <MessageToBuyer/>
                
                <div>
                <h2 style={{fontFamily:"berlin sans fb",textAlign:"center"}}>{rest_name}</h2>
                <h4 style={{fontFamily:"berlin sans fb",textAlign:"center"}}>My Orders</h4>
                </div>


                <div>
                {this.state.orders.map(order => {
                
                         
                 return(
                     <div>
                        <br />
                <h4 style={{ color: "black", fontFamily: "berlin sans fb" }}>
                  Customer Name:{" "}
                  <span style={{ color: "grey" }}> {order.buyer_name}</span>
                </h4>
                <h4 style={{ color: "black", fontFamily: "berlin sans fb" }}>
                  Customer Address:{" "}
                  <span style={{ color: "grey" }}> {order.buyer_address}</span>{" "}
                </h4>
                <br />
                <h4 style={{ fontFamily: "berlin sans fb" }}>
                  ■ {order.item_name}: Qty.({order.quantity}){" "}
                </h4>
                         <div>
                         
                         <h4 style={{ fontFamily: "berlin sans fb" }}>■ Status:</h4>
                            <select onChange={this.onChange} name="status">
                                <option value="new">New</option>
                                <option value="preparing">Preparing</option>
                                <option value="ready">Ready</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancel">Cancel</option>
                            </select>
                                <button onClick = {()=>this.onSave(order.buyer_id,order._id)} class="btn btn-danger m-2" style={{fontWeight:"bolder"}}>Save</button>
                                <button onClick = {()=>this.onMessage(order.buyer_id)} type="submit" class="btn btn-primary m-2" style={{fontWeight:"bolder"}} data-toggle="modal" data-target="#MessageToBuyer">Message This Buyer</button>
                                <br/><br/><br/>
                            </div>
                         
                    {/* {this.state.orders.map(order=>{
                        //if(order.buyer_id===buyer_id){
                        return(
                            <div>
                                
                                <h4 style={{fontFamily:"berlin sans fb"}}>---->{order.item_name}  ---- Qty.({order.quantity}) </h4>
                        
                            </div>
        
                            )
                       // }

                    })
                } */}
                </div>
                 )
                })
                }

                </div>
                
            </div>
        )
    }
}

export default OwnerHome;
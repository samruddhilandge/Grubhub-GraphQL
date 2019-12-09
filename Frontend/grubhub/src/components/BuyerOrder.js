import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import axios from 'axios';
import ItemTile from './ItemTile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {rooturl} from '../config';
import Draggable from 'react-draggable';
import MessageToOwner from './MessageToOwner';
//const BUYER_SIGNUP="BUYER_SIGNUP";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

//add restaurant tile dynamically according to the fetched data from the database
class BuyerOrder extends Component {

    constructor(props){
        super(props);

        this.state={
            
            orders:[],
            restaurant_ids:[]
            
        }
        
    }

    componentWillMount(){

        const data={
            //restaurant_id:localStorage.getItem('restaurant_id'),
            buyer_id:localStorage.getItem('buyer_id')              //HERE ADDED STATICALLY, ADD AFTER LOGIN THE CURRENT RESTAURANT'S ID
        }
        

        axios.post('http://'+rooturl+':3001/buyerorder',data)  //send restaurant id, to fetch data for that particular restaurant
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
               
                //console.log("Owner Orders:", response.data);
                //console.log("Response data rows:", response.data.restaurant_name); 
                const orders=response.data;
                //console.log(localStorage.getItem('restaurant_id'));
                console.log("orders:",orders);
                this.setState(
                    {orders}
                )
                
            }
            if(response.status === 202){
                console.log("in 202 create")
                this.setState({
                    flag1 : true
                })
            }
    
        });

    }


    onMessage(restaurant_id){
        localStorage.setItem('restaurant_id_message',restaurant_id);
        console.log("In onMessage of BuyerOrder");
        console.log("restaurant_id_message:",localStorage.getItem('restaurant_id_message'));
     }

    // cancelOrder(buyer_id){

    //     const data={
    //         buyer_id:buyer_id,
    //         restaurant_id:localStorage.getItem('restaurant_id')
    //     }

    //     axios.post('http://localhost:3001/cancelorder',data)  //send restaurant id, to fetch data for that particular restaurant
    //     .then(response => {
    //         console.log("Status Code : ",response.status);
    //         if(response.status === 200){
               
    //             alert('order deleted')
    //             // console.log("Owner Orders:", response.data);
    //             //console.log("Response data rows:", response.data.restaurant_name); 
    //             window.location.reload();
                
                
    //         }
    //         if(response.status === 202){
    //             console.log("in 202 create")
    //             this.setState({
    //                 flag1 : true
    //             })
    //         }
    
    //     });


    // }


    render(){


        {this.state.orders.map(order => {
            //console.log(order.item_name);
            if(!this.state.restaurant_ids.includes(order.restaurant_id))
            this.state.restaurant_ids.push(order.restaurant_id)
            console.log("restaurant_ids:",this.state.restaurant_ids);
           })

           }

        
        return(
            <div>
                <NavbarSearch/>
               <MessageToOwner/>
                <div>
                <h2 style={{fontFamily:"berlin sans fb",textAlign:"center"}}>My Orders</h2>
                <Link to='/pastbuyerorder'><button type="submit"  class="btn btn-primary m-2 btn-sm" style={{fontWeight:"bolder",float:"right"}}>Past Orders</button><span></span></Link>
                </div>


                <div>
                {this.state.restaurant_ids.map(restaurant_id => {
                 //console.log(order.item_name);
                 return(
                    //  {<div id="item-tile1">}
                     <div>    
                         {/* {<h3>Restaurant ID:{restaurant_id}</h3>} */}
                          
                         
                    {this.state.orders.map(order=>{
                        
                        if(order.restaurant_id===restaurant_id){
                        return(
                            <div>
                             
                                <div >

                                    <Card style={{height:280,width:280}}>
                                    <CardBody>
                                    <CardTitle><h3>Restaurant Name Here</h3></CardTitle>
                                    <CardSubtitle><h4></h4></CardSubtitle>
                                    <CardText>
                                    <h5>Item Name: {order.item_name}</h5>
                                    <h5>Quantity: {order.quantity}</h5>
                                    <h5>Status: {order.status}</h5>
                                    </CardText>
                                    <button onClick = {()=>this.onMessage(order.restaurant_id)} type="submit" class="btn btn-danger m-2" style={{fontWeight:"bolder"}} data-toggle="modal" data-target="#MessageToOwner">Message Restaurant's Owner</button>
                                     </CardBody>
                                    </Card>
                                </div>
                            </div>
                            )
                        }

                    })
                }
                </div>
                 )
                })
                }

                </div>
                
            </div>
        )
    }
}

export default BuyerOrder;
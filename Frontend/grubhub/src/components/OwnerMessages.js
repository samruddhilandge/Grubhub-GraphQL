import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import ItemTile from './ItemTile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {rooturl} from '../config';

class OwnerMesaages extends Component {

    constructor(props){
        super(props);

        this.state={
            
            messages:[],
            
        }
        
    }

    componentWillMount(){

        const data={
           
            restaurant_id:localStorage.getItem('restaurant_id')              //HERE ADDED STATICALLY, ADD AFTER LOGIN THE CURRENT RESTAURANT'S ID
        }
 

        axios.post('http://'+rooturl+':3001/getmessagestoowner',data)  //send restaurant id, to fetch data for that particular restaurant
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
            
                const messages=response.data;
           
                console.log("messages:",messages);
                this.setState(
                    {messages}
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


    render(){


        
        return(
            <div>
                <Navbar/>
               
                <div>
                <h2 style={{fontFamily:"berlin sans fb",textAlign:"center"}}>Inbox</h2>

                </div>


                <div>
                {this.state.messages.map(message => {
                 //console.log(order.item_name);
                 return(
                     <div id="item-tile">
                         
                       <h4>Message From : {message.buyer_name}  </h4> 
                       <h6 style={{color:"grey"}}>{message.message}</h6>
                        <br/><br/>
                     </div>
                 )
                })
                }

                </div>
                
            </div>
        )
    }
}

export default OwnerMesaages;
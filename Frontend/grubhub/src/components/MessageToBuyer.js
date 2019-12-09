import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ItemTile from './ItemTile';
import axios from 'axios';
import cookie from 'react-cookies';
import {rooturl} from '../config';
//add restaurant tile dynamically according to the fetched data from the database
class MessageToBuyer extends Component {

  constructor(props){
    super(props);

    this.state={
      message:''
    }
    //this.remove=this.remove.bind(this);
    this.sendMessage=this.sendMessage.bind(this);
    this.onChange=this.onChange.bind(this);
  }

onChange(e){

  this.setState({
    message:e.target.value
  })
}

sendMessage(){    //Add section button 

  console.log("In sendMessage of Message to buyer");
    const data={
     message:this.state.message,
     restaurant_id:localStorage.getItem('restaurant_id') ,
     restaurant_name:localStorage.getItem('restaurant_name'),
     buyer_id: localStorage.getItem('buyer_id_message')
     

    }
    axios.post('http://'+rooturl+':3001/messagetobuyer',data)
    .then(response => {
    console.log("Status Code : ",response.status);
    if(response.status === 200){
        
        console.log("Response data:", response.data);
        alert("Message successfully send!");

    }
    if(response.status === 202){
        console.log("in 202 create")
        this.setState({
            flag1 : true
        })
    }

    window.location.reload();

});

  }
  
    render(){
     
        return(
            <div class="container">
  
  
            <div class="modal fade" id="MessageToBuyer">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
              
                
                <div class="modal-header">
                  <h4 class="modal-title">Send a Message</h4><br/>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                
                <div class="modal-body">
                  
                <div class="form-group">
                      <input onChange = {this.onChange}  type="text" class="form-control" name="message" placeholder="Message"/>
                               
                   </div>

                </div>

                <div class="modal-footer">
                 <button type="button" onClick={this.sendMessage} class="btn btn-danger"  data-dismiss="modal" style={{fontWeight:"bolder"}}>Send Message</button>
                 <button type="button" class="btn btn-secondary" data-dismiss="modal" style={{fontWeight:"bolder"}}>Back</button>
                </div>
                
              </div>
            </div>
          </div>
          </div>
        )

    }
}

export default MessageToBuyer;
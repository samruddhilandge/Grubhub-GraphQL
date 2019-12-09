import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ItemTile from './ItemTile';
import axios from 'axios';
import cookie from 'react-cookies';
import {rooturl} from '../config';
class DeleteSection extends Component {

  constructor(props){
    super(props);

    this.state={
      section:''
    }
   
    this.deleteSection=this.deleteSection.bind(this);
    this.onChange=this.onChange.bind(this);
  }

onChange(e){

  this.setState({
    section:e.target.value
  })
}

deleteSection(){    //Add section button 

    const data1={
     section:this.state.section,
     restaurant_id:localStorage.getItem('restaurant_id')   

    }
    axios.post('http://'+rooturl+':3001/deleteSection',data1)
    .then(response => {
    console.log("Status Code : ",response.status);
    if(response.status === 200){
   
        console.log("Response data:", response.data);
        console.log("Response data rows:", response.data.restaurant_name); 
        alert("Section deleted");
    


    }
    if(response.status === 202){
        console.log("in 202 create")
        this.setState({
            flag1 : true
        })
    }

    alert("Section added");
    window.location.reload();

});

  }
  
    render(){
     
        return(
            <div class="container">
  
  
            <div class="modal fade" id="DeleteSection">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
              
                
                <div class="modal-header">
                  <h4 class="modal-title">Delete Section</h4><br/>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                
                <div class="modal-body">
                  
                <div class="form-group">
                      <input onChange = {this.onChange}  type="text" class="form-control" name="section" placeholder="Section Name"/>
                               
                   </div>

                </div>
                
                
                <div class="modal-footer">
                 <button type="button" onClick={this.deleteSection}class="btn btn-danger"  data-dismiss="modal" style={{fontWeight:"bolder"}}>Delete Section</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal" style={{fontWeight:"bolder"}}>Back</button>
                </div>
                
              </div>
            </div>
          </div>
          </div>
        )

    }
}

export default DeleteSection;
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ItemTile from './ItemTile';
import {rooturl} from '../config';
//add restaurant tile dynamically according to the fetched data from the database
class Modal extends Component {
    render(){
        return(
            <div class="container">
  
  {/*<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
    Open modal
        </button>*/}
            <div class="modal fade" id="myModal">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
              
                
                <div class="modal-header">
                  <h4 class="modal-title">Item Name - $price</h4><br/>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                
                <div class="modal-body">
                  

                <div class="row">
        <div class="col-sm-3">
            <div class="input-group">
                <span class="input-group-btn">
              <button type="button" class="btn btn-default btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
              <i class='fas fa-minus'/>
                </button>
                </span>

                <input type="text" name="quant[1]" class="form-control input-number" value="1" min="1" max="10"/>
                <span class="input-group-btn">
              <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
              <i class='fas fa-plus'></i>
                </button>
                </span>
            </div>
        </div>
    </div>
    <ItemTile/>

                </div>
                
                
                <div class="modal-footer">
                 <button type="button" class="btn btn-danger"  data-dismiss="modal" style={{fontWeight:"bolder"}}>Add to Bag</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal" style={{fontWeight:"bolder"}}>Back</button>
                </div>
                
              </div>
            </div>
          </div>
          </div>
        )

    }
}

export default Modal;
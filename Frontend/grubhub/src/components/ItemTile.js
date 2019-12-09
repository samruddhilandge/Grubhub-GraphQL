import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import {rooturl} from '../config';
//Create a Main Component
class ItemTile extends Component {
    render(){
        return(

            <div id="item-tile" >
            <div style={{display:'inline-block',verticalAlign:'top'}}>
                <img src="http://www.tkspizzaonline.com/Images/pizza.jpg"  height="100" width="100"/>
            </div>
            <div style={{display:'inline-block'}}>
            <h6 id="item-detail">Item Name</h6>

            <div style={{display:'inline-block',marginRight:"0"}}>
                Quantity: <div> //0 initialized</div> 
                <button class="counter">+</button><button class="counter">-</button></div>
                Yet to add:  ADD to card button
            </div> 
        </div>

        )
    }
}

export default ItemTile;
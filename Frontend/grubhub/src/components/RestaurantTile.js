import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavbarSearch from './NavbarSearch';

//Create a Main Component
class RestaurantTile extends Component {
    render(){
        return(
            <div id="restaurant-tile" >
                <div style={{display:'inline-block',verticalAlign:'top'}}>
                    <img src="http://www.tkspizzaonline.com/Images/pizza.jpg"  height="100" width="100"/>
                </div>
                <div style={{display:'inline-block'}}>
                <h6 id="restaurant-detail">Restaurant Name</h6>
                </div> 
            </div>
        )
    }
}

export default RestaurantTile;
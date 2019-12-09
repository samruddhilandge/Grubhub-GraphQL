import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import RestaurantTile from './RestaurantTile';
import ItemTile from './ItemTile';


class Restaurants extends Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <NavbarSearch/>
                <div style={{height:"100%",width:"100%",backgroundColor:"green"}}>
                  
                </div>
                
                <div>
                <ItemTile/>
                <RestaurantTile/>  
                <RestaurantTile/>
                <RestaurantTile/>
                <RestaurantTile/>
                <RestaurantTile/>
                <RestaurantTile/>

                
                </div>
            </div>
        )
    }
}

export default Restaurants;
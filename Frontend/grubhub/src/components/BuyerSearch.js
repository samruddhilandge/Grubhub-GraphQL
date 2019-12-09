import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import {rooturl} from '../config';
//This page to be triggered from BuyerHome page after it searches a particular food item
class BuyerHome extends Component {
    render(){
        return(
            <div>
                <NavbarSearch/>
                
                <div class="searchh5">
                    <h5 >Best bets for <span style={{color:"#007bff"}}>"the item they searched //we can add no.of restaurants fetched as in grubhub"</span></h5>
                </div>
                
                <div>
                <div class="btn-text">
                    <div class="btn-group-vertical col-xs-12 col-xs-offset-0 col-sm-offset-3 col-sm-6">  {/* style={{fontFamily:"berlin sans fb"}}the number of buttons should be dynamic..== no. of restaurants searched fromthe database*/ }

                            <button type="button"  id="restaurant-btn" class="btn btn-light" >Restaurant 1</button>
                            <button type="button"  id="restaurant-btn" class="btn btn-light">Restaurant 2</button>
                            <button type="button"  id="restaurant-btn" class="btn btn-light">Restaurant 3</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default BuyerHome;
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import RestaurantTile from './RestaurantTile';
import ItemTile from './ItemTile';

//add restaurant tile dynamically according to the fetched data from the database
class Section extends Component {
    render(){
        return(
            <div>
                
                <div class="section=head">
                    <h3>Section Name</h3>  {/* Dynamic fetch */}
                    <div class="section-body">
                        <ItemTile/>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Section;
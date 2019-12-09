import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import BuyerSignin from './BuyerSignin';
import BuyerSignup from './BuyerSignup';
import Navbar from './Navbar';
import BuyerHome from './BuyerHome';
import BuyerSearch from './BuyerSearch';
import Restaurants from './Restaurants';
import Restaurant from './Restaurant';
import NavbarSearch from './NavbarSearch';  //its a single component so remove it afterwards
import OwnerHome from './OwnerHome';
import OwnerMenu from './OwnerMenu';
import OwnerSignin from './OwnerSignin';
import OwnerSignup from './OwnerSignup';
import Start from './Start';
import EditBuyerProfile from './EditBuyerProfile';
import BuyerProfile from './BuyerProfile';
import Modal from './Modal';
import OwnerProfile from './OwnerProfile';
import AddItem from './AddItem';
import BuyerOrder from './BuyerOrder';
import OwnerStatus from './OwnerStatus';
import UpdateItem from './UpdateItem';
import PastBuyerOrder from './PastBuyerOrder';
import BuyerMessages from './BuyerMessages';
import OwnerMessages from './OwnerMessages';

import {rooturl} from '../config';

//Create a Main Component
class Main extends Component {

    
    render(){
        return(
            <div>
                
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={Start}/>
                <Route exact path="/buyersignin" component={BuyerSignin}/>
                <Route  exact path="/buyersignup" component={BuyerSignup}/>
                
                <Route exact  path="/buyerhome" component={BuyerHome}/>
                <Route exact path="/buyersearch" component={BuyerSearch}/>
                <Route exact path="/restaurants" component={Restaurants}/>
                <Route exact  path="/navbarsearch" component={NavbarSearch}/>
                <Route exact path="/restaurant" component={Restaurant}/>
                <Route exact path="/ownerhome" component={OwnerHome}/>
                <Route exact path="/ownermenu" component={OwnerMenu}/>
                <Route exact path="/ownersignup" component={OwnerSignup}/>
                <Route exact path="/ownersignin" component={OwnerSignin}/>
                
                <Route exact path="/editbuyerprofile" component={EditBuyerProfile}/>
                <Route exact path="/buyerprofile" component={BuyerProfile}/>
                <Route exact path="/ownerprofile" component={OwnerProfile}/>
                <Route exact path="/additem" component={AddItem}/>
                <Route exact path="/buyerorder" component={BuyerOrder}/>
                <Route exact path="/ownerstatus" component={OwnerStatus}/>
                <Route exact path="/updateitem" component={UpdateItem}/>
                <Route exact path="/pastbuyerorder" component={PastBuyerOrder}/>
                <Route exact path="/buyermessages" component={BuyerMessages}/>
                <Route exact path="/ownermessages" component={OwnerMessages}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;
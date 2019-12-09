import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
//const BUYER_SIGNUP="BUYER_SIGNUP";
import {BUYER_LOGOUT} from '../redux/constants/action-types';
import CartModal from './CartModal';
import {rooturl} from '../config';

//create the Navbar Component
class NavbarSearch extends Component {

    constructor(props){
        super(props);
        this.state={
            search:false,
            profile:false,
            authFlag:false,
            searchedItem:'',
            result:'',
            bag:[]
        }
        this.onLogout=this.onLogout.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onCart=this.onCart.bind(this);
        this.onProfile = this.onProfile.bind(this);
        //this.onInputChangeHandler=this.onInputChangeHandler.bind(this);

    }
 
   
    onLogout(e){
        e.preventDefault();
      //  this.props.buyerlogout();
        //  cookie.remove('cookie', { path: '/' })
        //  console.log("Cookie:",cookie);
       // cookie.remove('authCookie', { path: '/' })
       cookie.remove('cookie', { path: '/' })
       window.location.href='http://'+rooturl+':3000/';
        
    }

    onInputChangeHandler(e){
        this.setState({
            searchedItem:e.target.value 
        })
        console.log(this.state.searchedItem);
    }

    onSearch(e){
        e.preventDefault();


    }
    

    onCart(e){
        e.preventDefault();
        axios.post('http://'+rooturl+':3001/bagtable')
    .then(response => {
    console.log("Status Code : ",response.status);
    if(response.status === 200){
        
        // this.setState({
        //     flag2 : true
        // })
        console.log("Response data in navbarsearch:", response.data);
        //console.log("Response data rows:", response.data.restaurant_name); 
        const bag=response.data;
        console.log("bag:",bag);
        this.setState(
            {bag}
        )
         console.log("this.state.bag:",this.state.bag);
        /* console.log("res_id:",this.state.bag[0].restaurant_id);
        console.log("res_name:",this.state.bag[0].restaurant_name);
        console.log("owner_name:",this.state.bag[0].owner_id); */  
        
    }
    if(response.status === 202){
        console.log("in 202 create")
        this.setState({
            flag1 : true
        })
    }

});

    }

    onProfile(e){
        e.preventDefault();
        this.setState({
            profile:true
            //send the searched item to backend and it should return the data on the restaurants page
        })
    
    }
    // myProfile(e){
    //     e.preventDefault();
    //     this.props.buyerlogout();
        
    // }
    
    render(){
        
        console.log("Searched item:",this.state.searchedItem);
        let redirectSearch=null;
        if(this.state.search){
            redirectSearch=<Redirect to= "/restaurants"/>
            
        }
        // let redirectVar=null;
        // if(!this.props.login){
        //     redirectVar = <Redirect to= "/buyersignin"/>
        //  } 
         let redirectProfile=null;
         if(this.state.profile){
            redirectProfile = <Redirect to= "/buyerprofile"/>
          }
          let redirectLogout=null;
          if(!cookie.load('cookie')){
              console.log("logouttt");
              
    
        }
        return(
            
            <div>
                <CartModal/>
                {/* {redirectVar} */}
                {redirectSearch}
                {redirectProfile}
                
            <nav class="navbar navbar-inverse navbar-fixed-top">
                
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#" style={{fontFamily:"segoe ui black"}}>GRUBHUB</a>
                        </div>
                        {/*<div class="center-search">
                        <input type="text" onChange={this.onInputChangeHandler} placeholder="Pizza, Pastas,..."  name="search"/>
                        <button onClick={this.onSearch} class="btn btn-primary m-2 btn-sm" style={{fontWeight:"bolder"}}>Find Food</button><span></span>
        </div>*/}
                        

                    <div class="nav navbar-right">
                    <Link to="/buyerprofile" class=" m-2" style={{fontWeight:"bolder"}}>{localStorage.getItem('buyer_name')}</Link>
                    <Link to="/buyermessages"><button class="btn btn-primary m-2 btn-sm" style={{fontWeight:"bolder"}}>My Messages</button></Link>
                    <Link to="/buyerorder"><button class="btn btn-primary m-2 btn-sm" style={{fontWeight:"bolder"}}>My Orders</button></Link>
                    <button class="btn btn-danger m-2 btn-sm" onClick={this.openCart} style={{fontWeight:"bolder"}} data-toggle="modal" data-target="#cartModal">My Bag</button>
                    <button onClick={this.onLogout} class="btn btn-secondary m-2 btn-sm" style={{fontWeight:"bolder"}}>Logout</button>
                    </div>
                    
            </nav>
            
            <div>

            <div class="container">
  
  
            <div class="modal fade" id="cartModal">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
              
                
                <div class="modal-header">
                  <h4 class="modal-title">My Bag</h4><br/>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                
                
                <div class="modal-body">
                  

               {/*Give check box to select items to remove from the cart */} 
               {this.state.bag.map(b => {
                 console.log(b.item_name);
                return(
                
              <div>
                  <h6>{b.item_name}</h6>
                  <h4>Your total is:: $$</h4>
    
              </div>
            
            )})
                }

                </div>
                
                
                <div class="modal-footer">
                 <button type="button" class="btn btn-danger"  data-dismiss="modal" style={{fontWeight:"bolder"}}>Order Confirm</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal" style={{fontWeight:"bolder"}}>Back</button>
                </div>
                
              </div>
            </div>
          </div>
          </div>







            </div>












            
            </div>
            
        );
        }
}

export default NavbarSearch;

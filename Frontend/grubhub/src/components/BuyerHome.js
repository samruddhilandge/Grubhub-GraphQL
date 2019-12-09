import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import Navbar from './Navbar';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import {rooturl} from '../config';
//const BUYER_SIGNUP="BUYER_SIGNUP";
import {BUYER_LOGOUT} from '../redux/constants/action-types';
import Modal from './Modal';
import CartModal from './CartModal';
import axios from 'axios';
//import logo from './logo.svg';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import {Widget, addResponseMessage,addLinkSnippet,addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
//import { Link } from 'react-router';
//Create a Main Component
class BuyerHome extends Component {

    constructor(props){
        super(props);
        this.state={
            flag:false,
            flag1:false,
            flag2:false,
            cuisineFlag:false,
            searchedItem:'',
            restaurants:[],
            imageView:[],
            cuisine:''
        }      
        this.onSearchChangeHandler=this.onSearchChangeHandler.bind(this);
        this.onSearch=this.onSearch.bind(this);
        this.onCuisineChange=this.onCuisineChange.bind(this);
        this.onRestaurantSelect=this.onRestaurantSelect.bind(this);
        this.onCuisineSearch=this.onCuisineSearch.bind(this);
    }

    componentDidMount() {
        addResponseMessage("Howdy! How can we help you?");
      }

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
      }
    onSearchChangeHandler(e){
        this.setState({
            searchedItem:e.target.value 
        })
        console.log(this.state.searchedItem);
    }
    onCuisineChange(e){

        this.setState({
            cuisine:e.target.value,
            cuisineFlag:true
        })


    }

    onSearch(e){
        e.preventDefault();
        const data={
            searchedItem:this.state.searchedItem
        };
        /* this.setState({
            search:true
            //send the searched item to backend and it should return the data on the restaurants page
        }) */
        //this.props.sendData("Hey Popsie, How’s it going?");
        axios.post('http://'+rooturl+':3001/search',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    flag : true
                })
                console.log("Response data:", response.data);
                //console.log("Response data rows:", response.data.restaurant_name); 
                const restaurants=response.data
                this.setState(
                    {restaurants}
                )

                //CHANGE NEEDED BELOWWW----with images---------------
                // this.setState({
                //     restaurants : this.state.restaurants.concat(response.data) ,
                //     length:response.data.length
                // });
                    
                // this.state.restaurants.map(restaurantdata => 
                //     {
                //             // var dataimage =
                //             // {
                //             //     path:property.image,
                //             //     name:property.imagename
                //             // }
                //             console.log(restaurantdata.imagelocation);
                //             axios.post('http://'+rooturl+':3001/download/'+restaurantdata.imagelocation)
                //             .then(response => {
                //                 console.log("Imgae Res : ",response);
                //                 let imagePreview = 'data:image/jpg;base64, ' + response.data;
                //                  this.setState({
                //                     imageView: this.state.imageView.concat(imagePreview)
                //                  })
                                
                //             });
                //         });
                
            }
            if(response.status === 202){
                console.log("in 202 create")
                this.setState({
                    flag1 : true
                })
            }
    
        });
    }

    onRestaurantSelect(id,name){
        //e.preventDefault();
        const data={
            id:id,
            name:name
        }
        //localStorage.clear();
        //const id={id:this.state.restaurants.restaurant_id}
        console.log("id=",data.id);
        localStorage.setItem('restaurant_id',data.id);
        localStorage.setItem('restaurant_name',data.name);
        console.log("Local Storage rest_id:",localStorage.getItem('restaurant_id'));
        console.log("Local Storage rest_name:",localStorage.getItem('restaurant_name'));
        this.setState({
               flag2 : true
            })
        

        
    }

    onCuisineSearch(e){
        e.preventDefault();
        const data={
            cuisineSearched:this.state.cuisine
        }

        this.setState({
            restaurants:this.state.restaurants.filter(restaurant=>restaurant.cuisine===this.state.cuisine)
        })
        console.log("restaurants after cuisine filter:",this.state.restaurants);
        console.log("Cuisine:",this.state.cuisine);
        // this.state.restaurants.map(restaurant => {
        //     if(restaurant.cuisine != this.state.cuisine){

        //         let index=this.state.restaurants.indexOf(restaurant);
        //         if(index>-1){
        //             this.state.restaurants.splice(index,1);
        //          }
        // }
        // })
        /* this.setState({
            search:true
            //send the searched item to backend and it should return the data on the restaurants page
        }) */
        //this.props.sendData("Hey Popsie, How’s it going?");
        // axios.post('http://'+rooturl+':3001/cuisinesearch',data)
        // .then(response => {
        //     console.log("Status Code : ",response.status);
        //     if(response.status === 200){
        //         this.setState({
        //             flag : true
        //         })
        //         console.log("Response data:", response.data);
        //         //console.log("Response data rows:", response.data.restaurant_name); 
        //         const restaurants=response.data
        //         this.setState(
        //             {restaurants}
        //         )
                
        //     }
        //     if(response.status === 202){
        //         console.log("in 202 create")
        //         this.setState({
        //             flag1 : true
        //         })
        //     }
    
        // });
    }

    
    render(){
        var i=-1;
        let redirectVar=null;
        console.log("Searched item:",this.state.searchedItem);
        console.log("result:",this.state.result);
    //     if(!cookie.load('cookie')){     //keep here stg
    //         redirectVar = <Redirect to= "/buyersignin"/>
    //    }
    //{redirectVar} jeep this inside return                             //onClick={this.onSearch}
    // if(this.state.flag2){
    //     redirectVar=<Redirect to="/restaurant"/>
    // }
    let restaurant_list;
      //profileAvatar={logo}
        return(
            
            <div>
                {redirectVar}
              <NavbarSearch  />
              <Widget  handleNewUserMessage={this.handleNewUserMessage}
                
                title="Grubhub"
                subtitle="Buyer"/>
              <div align="center">
              <input type="text"  name="searcheditem" onChange={this.onSearchChangeHandler} placeholder="Pizza,Burger,.."/>
              <button onClick={this.onSearch} class="btn btn-primary m-2 btn-sm" style={{fontWeight:"bolder"}}>Find Food</button><br></br>
              <input type="text"  name="cuisine" onChange={this.onCuisineChange} placeholder="Cuisine"/>
              <button onClick={this.onCuisineSearch} class="btn btn-danger m-2 btn-sm" style={{fontWeight:"bolder"}}>Filter by Cuisine</button>
              <div>
              <img src="https://wallpapershome.com/images/pages/pic_h/16605.jpg" height="300" width="100%"/>
              </div>


             
                  {/**Cuisine one */}      
             {/* <select onChange= {this.onCuisineChange}  name="cuisine">
                                    
                    {this.state.restaurants.map(restaurant=>{

                         return(
                               <option key={restaurant.cuisine} value={restaurant.cuisine}>{restaurant.cuisine}</option>
                                            )
                            })}
                                        
                                        
              </select> */}
                        
              
             
             <div>
             {this.state.restaurants.map(restaurant => {
                 i=i+1;
                return(
                
              <div id="restaurant-tile">
                <div style={{display:'inline-block',verticalAlign:'top'}}>
                     {/* {<img src={this.state.imageView[i]} height="100" width="100"/>}  */}
                     <img src="http://www.tkspizzaonline.com/Images/pizza.jpg"  height="100" width="100"/>
                </div>
                <div style={{display:'inline-block'}}>
                <Link to="/restaurant"><a onClick={()=>this.onRestaurantSelect(restaurant.restaurant_id,restaurant.restaurant_name)}><h3 style={{color:'black'}} id="restaurant-detail">{restaurant.restaurant_name}</h3></a></Link>
                </div> 
            </div>
            
            
            )})
                }
            </div>
            
              </div>
              {/*<Modal/>*/}
              
              
            </div>
        );
                
}
}

export default BuyerHome;

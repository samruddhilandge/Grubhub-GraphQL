import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavbarSearch from './NavbarSearch';
import RestaurantTile from './RestaurantTile';
import ItemTile from './ItemTile';
import {Redirect} from 'react-router';


//add restaurant tile dynamically according to the fetched data from the database
class Start extends Component {

    constructor(props){

        super(props);
        this.state={
            flag:0
        }
    }
    buyer=(e)=>{

        this.setState({
            flag:1
        })
       
    }

    owner=(e)=>{

        this.setState({
            flag:2
        })
     }
    render(){
        let redirectVar1=null;
        let redirectVar2=null;
        if(this.state.flag==1){
            redirectVar1=<Redirect to= "/buyersignin"/>
        }
        
        if(this.state.flag==2){
            redirectVar1=<Redirect to= "/ownersignin"/>
        }
        return(
            
            <div>
        {redirectVar1}

                {redirectVar2}

        
                <h1 style={{textAlign:"center",fontFamily: 'berlin sans fb',marginTop:100}}>Welcome to <span style={{color:"#e11b22"}}>GRUBHUB</span></h1>
                <h3 style={{textAlign:"center",fontFamily: 'berlin sans fb',marginTop:100}}>Are you a <span style={{color:"#e11b22"}}>Buyer</span> or <span style={{color:"#e11b22"}}>Owner?</span> </h3><br/><br/>
                <div style={{marginLeft:825}}>
                <button onClick = {this.buyer} class="btn btn-primary">Buyer</button><br/><br/>
                  
                <button onClick = {this.owner} class="btn btn-primary">Owner</button><br/><br/>
            
                </div>
            </div>

        )
    }
}

export default Start;
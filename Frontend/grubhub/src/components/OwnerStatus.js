import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import ItemTile from './ItemTile';
import Section from './TempSection';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {rooturl} from '../config';
class OwnerStatus extends Component {

    constructor(props){

        super(props);

        this.state={
        
            restaurant_id:localStorage.getItem('restaurant_id'),
            orders:[],
            status:'',
            buyer_ids:[]
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
    }

    componentWillMount(){

        const data={
            restaurant_id:this.state.restaurant_id
            
        }
        axios.post('http://'+rooturl+':3001/statusorder',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    flag : true
                })
                console.log("Response data:", response.data);
                const buyer_ids=response.data;
                console.log(buyer_ids);
                this.setState(
                    {buyer_ids}
                )
                
            }
            if(response.status === 202){
                console.log("in 202 create")
                this.setState({
                    flag1 : true
                })
            }
    
        });

    }

    onSelectChange(e){
        this.setState({
            section:e.options[e.selectedIndex].value
        })
       
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const data={
            item_name:this.state.item_name,
            description:this.state.description,
            price:this.state.price,
            section:this.state.section,
            restaurant_id:this.state.restaurant_id,
            cuisine:this.state.cuisine
    
        }
    
        
        axios.post('http://'+rooturl+':3001/statusorder',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    flag : true
                })
                console.log("Response data:", response.data);
                const buyer_ids=response.data;
                console.log(buyer_ids);
                this.setState(
                    {buyer_ids}
                )
                
            }
            if(response.status === 202){
                console.log("in 202 create")
                this.setState({
                    flag1 : true
                })
            }
    
        });
    
    
    }


    render(){
        console.log('section selected:',this.state.section);
        let redirectVar=null;
        
        if(!cookie.load('cookie')){   
            redirectVar = <Redirect to= "/ownersignin"/>
       }
        
        return(
            <div>
                {redirectVar}
                <Navbar/>
                <div>
                <h2 style={{fontFamily:"berlin sans fb",textAlign:"center"}}>Change Order Status</h2>
              
                </div>
                
                <div class="profile-main-div">
                    <div class="panel">
      
                            <div class="form-group">
                                
                                    {this.state.buyer_ids.map(buyer_id=>{

                                        return(
                                            <div>
                                            <h4>{buyer_id.buyer_id}</h4>
                                            <select onChange={this.onChange} class="form-control" name="section">
                                                <option value="new">New</option>
                                                <option value="preparing">Preparing</option>
                                                <option value="ready">Ready</option>
                                                <option value="delivered">Delivered</option>
                                                </select>
                                            </div>
                                        )
                                    })}
                            
                            </div>
                
                        
                            <button onClick = {this.onSubmit} class="btn btn-danger" style={{fontWeight:"bolder"}}>Save</button><br/><br/>
                   
                            </div>
                       </div>







            </div>
        )
    }
}

export default OwnerStatus;
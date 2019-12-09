import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import ItemTile from './ItemTile';
import Section from './TempSection';
import cookie from 'react-cookies';
import {Link} from 'react-router-dom';
import {rooturl} from '../config';
//add restaurant tile dynamically according to the fetched data from the database
class UpdateItem extends Component {

    constructor(props){

        super(props);

        this.state={
            item_name:'',
            description:'',
            price:'',
            section:'',
            sectionsAvailable:[],
            restaurant_id:localStorage.getItem('restaurant_id'),
            cuisine:''
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
        this.onSelectChange=this.onSelectChange.bind(this);
    }

    componentDidMount(){
        const data={
            item_id:localStorage.getItem('item_id')
        }

        
        axios.post('http://'+rooturl+':3001/itemdata',data)  //similar to buyers restaurant page
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    
                    // this.setState({
                    //     flag2 : true
                    // })
                    console.log("Response data:", response.data);
                    //console.log("Response data rows:", response.data.restaurant_name); 
                    const item=response.data;
                    console.log("item:",item);
                    this.setState(
                        {item}
                    );
                    this.setState({
                        item_name:item[0].item_name,
                        description:item[0].description,
                        price:item[0].price,
                        cuisine:item[0].cuisine,
                        section:item[0].section_name
                    })

                    //imagelocation:response.data[0].imagelocation  __DONT FORGET TO DO THISS




                    /* console.log("this.   state.restaurant:",this.state.restaurant);
                    console.log("res_id:",this.state.restaurant[0].restaurant_id);
                    console.log("res_name:",this.state.restaurant[0].restaurant_name);
                    console.log("owner_name:",this.state.restaurant[0].owner_id); */
                    
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
        //console.log('section selected:',this.state.section);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const data={
            item_id:localStorage.getItem('item_id'),
            item_name:this.state.item_name,
            description:this.state.description,
            price:this.state.price,
            section:this.state.section,
            cuisine:this.state.cuisine,
           
    
        }
      
        
        axios.post('http://'+rooturl+':3001/updateitem',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    flag : true
                })
                
                alert("Item Updated");
                
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

        
        return(
            <div>
                <Navbar/>
                <div>
                <h2 style={{fontFamily:"berlin sans fb",textAlign:"center"}}>Update your Item</h2>
                
                {/*<h4 style={{fontFamily:"berlin sans fb",textAlign:"center"}}>My Orders</h4>*/}
                </div>
                
                <div class="profile-main-div">
                    <div class="panel">

                        <div class="form-group">
                                <input onChange = {this.onChange} value={this.state.item_name} type="text" class="form-control" name="item_name" placeholder="Item Name"/>
                                <div style={{color:"red"}}>{this.state.nameError}</div>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} value={this.state.description} type="text" class="form-control" name="description" placeholder="Description"/>
                                <div style={{color:"red"}}>{this.state.emailError}</div>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} value={this.state.price} type="text" class="form-control" name="price" placeholder="Price"/>
                                <div style={{color:"red"}}>{this.state.passwordError}</div>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} value={this.state.cuisine} type="text" class="form-control" name="cuisine" placeholder="Cuisine"/>
                                <div style={{color:"red"}}>{this.state.passwordError}</div>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} value={this.state.section} type="text" class="form-control" name="section" placeholder="Section"/>
                                <div style={{color:"red"}}>{this.state.sectionError}</div>
                            </div>
                
                        
                            <button onClick = {this.onSubmit} class="btn btn-danger" style={{fontWeight:"bolder"}}>Update</button><br/><br/>
                   
                            </div>
                       </div>







            </div>
        )
    }
}

export default UpdateItem;
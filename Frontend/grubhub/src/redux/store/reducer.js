const initialStore ={
    registered:false,
    buyerlogin:false,
    ownerlogin:false,
    ownerregistered:false,
    save:false,
    buyer_id:0,
    buyer_name:'',
    buyer_address:'',
    restaurant_name:'',
    restaurant_id:0
    
}
const reducer = (state = initialStore,action) => {
    if(action.type === "BUYER_SIGNUP"){
        return {
            ...state,
            registered : true
        }
    }

    if(action.type === "BUYER_SIGNIN" && action.status==200){
        return {
            ...state,
            buyerlogin : true,
            buyer_id:action.payload._id,
            buyer_name:action.payload.name,
            buyer_address:action.payload.address
            
        }
    }
    if(action.type === "BUYER_SIGNIN" && action.status!=200){
        return {
            ...state,
            buyerlogin : false
            
        }
    }
    if(action.type === "OWNER_SIGNUP"){
        return {
            ...state,
            ownerregistered : true
        }
    }

    if(action.type === "BUYER_LOGOUT"){
        return {
            ...state,
            buyerlogin : false
        }
    }
    if(action.type === "OWNER_SIGNIN" && action.status==200){
        return {
            ...state,
            ownerlogin : true,
            restaurant_id:action.payload._id,
            restaurant_name:action.payload.restaurant_name
        }
    }

    if(action.type === "OWNER_SIGNIN" && action.status!=200){
        return {
            ...state,
            ownerlogin : false
        }
    }
    if(action.type === "OWNER_LOGOUT"){
        return {
            ...state,
            ownerlogin : false
        }
    }

    if(action.type === "SAVE"){
        return {
            ...state,
            save : true
        }
    }

    // if(action.type === "BUYER_INFO"){
    //     return{
    //         ...state,
    //         buyer
    //     }
    // }
    return state;
}

export default reducer;
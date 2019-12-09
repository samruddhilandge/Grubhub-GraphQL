import {rooturl} from '.../config';
import {BUYER_SIGNUP} from '../constants/action-types.js/index.js';
import {BUYER_SIGNIN} from '../constants/action-types.js/index.js';
import {OWNER_SIGNIN} from '../constants/action-types.js/index.js';
/* export function buyerSignup(){

    return function(dispatch){

        axios.post('http://localhost:3001/login',data)
        .then(response =>response.json())
        .then(data=>dispatch({
            type:BUYER_SIGNUP,
            payload:data
        })) 
    }
} */


//ES-6
// export const buyersignup=()=>dispatch=> {

//         axios.post('http://'+rooturl+':3001/buyersignup',data)
//         .then(response =>response.json())
//         .then(data=>dispatch({
//             type:BUYER_SIGNUP,
//             payload:data   //what exactly to write here
//         })) 
    
// }

// export const buyersignin=()=>dispatch=> {

//     axios.post('http://'+rooturl+':3001/buyersignin',data)
//     .then(response =>response.json())
//     .then(data=>dispatch({
//         type:BUYER_SIGNIN,
//         payload:data   //what exactly to write here
//     })) 

// }

// export const ownersignin=()=>dispatch=> {

//     axios.post('http://'+rooturl+':3001/ownersignin',data)
//     .then(response =>response.json())
//     .then(data=>dispatch({
//         type:OWNER_SIGNIN,
//         payload:data   //what exactly to write here
//     })) 

// }
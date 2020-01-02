
import { gql } from 'apollo-boost';

const signupBuyermutation = gql`
mutation signupBuyer($email: String!, $name: String!,$password: String!)
 {
    signupBuyer(email: $email,name: $name,password: $password,) {
        responseMessage
    }
}`
;

const signinBuyermutation=gql`
mutation signinBuyer($email: String!,$password: String!)
 {
    signinBuyer(email: $email,password: $password,) {
        responseMessage
    }
}`
;

const updateBuyerProfile = gql`
mutation updateBuyerProfile($email: String!, $name: String!) {
    updateBuyerProfile( email: $email, name: $name ) {
        
        name
        email
    }
}`;

const updateOwnerProfile = gql`
mutation updateOwnerProfile($email: String!, $name: String!,$restaurant_name:String!,$cuisine:String!) {
    updateOwnerProfile( email: $email, name: $name,restaurant_name:$restaurant_name ,cuisine:$cuisine) {
        
        name
        email
        restaurant_name
        cuisine
    }
}`;

    const signupOwnermutation = gql`
    mutation signupOwner($email: String!, $name: String!,$password: String!,$restaurant_name: String!,$cuisine: String!)
    {
        signupOwner(email: $email,name: $name,password: $password,restaurant_name:$restaurant_name,cuisine:$cuisine) {
            responseMessage
        }
    }`
    ;

const signinOwnermutation=gql`
mutation signinOwner($email: String!,$password: String!)
 {
    signinOwner(email: $email,password: $password,) {
        responseMessage
        
        restaurant_name
        owner_name
        cuisine
    }
}`
;

const addItem = gql`
mutation addItem($item_name: String!, $price: String!,$description: String!,$section_name:String!,$cuisine: String!)
 {
    addItem(item_name: $item_name, price: $price,description: $description,section_name:$section_name,cuisine: $cuisine) {
        responseMessage
        item_name
        description
        price
        cuisine
        section_name
    
    
    }
}`
;

const addSection = gql`
mutation addSection($section_name:String!)
 {
    addSection(section_name:$section_name) {
        responseMessage
        section_name
    
    
    }
}`
;

export {signupBuyermutation,signinBuyermutation,signupOwnermutation,signinOwnermutation,addItem,addSection
};

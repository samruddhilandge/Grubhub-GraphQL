import { gql } from 'apollo-boost';

const getBuyer = gql`
    {
        buyer {
            name
            email
        }
    }
`;

const getOwner=
gql`
    {
        owner {
            name
            email
            restaurant_name
        }
    }
`;
export {getBuyer,getowner};
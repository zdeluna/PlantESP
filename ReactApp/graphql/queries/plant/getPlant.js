import gql from 'graphql-tag';

export const GET_PLANT = gql`
    query getPlant($id: ID!) {
        plant(id: $id) {
            name
            id
        }
    }
`;

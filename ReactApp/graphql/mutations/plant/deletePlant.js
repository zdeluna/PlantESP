import gql from 'graphql-tag';

export const DELETE_PLANT = gql`
    mutation deletePlant($id: ID!) {
        deletePlant(id: $id) {
            success
            id
        }
    }
`;

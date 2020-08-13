import gql from 'graphql-tag';

export const WATER_PLANT = gql`
    mutation waterPlant($id: ID!) {
        waterPlant(id: $id) {
            success
        }
    }
`;

import gql from 'graphql-tag';

export const CREATE_PLANT = gql`
    mutation createPlant($name: String!) {
        createPlant(name: $name) {
            id
        }
    }
`;

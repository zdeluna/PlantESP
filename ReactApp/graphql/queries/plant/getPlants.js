import gql from 'graphql-tag';

export const GET_PLANTS = gql`
    query getPlants {
        plants {
            name
            id
            water_datetimes
        }
    }
`;

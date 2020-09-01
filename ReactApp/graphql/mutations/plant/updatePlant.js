import gql from 'graphql-tag';

export const UPDATE_PLANT = gql`
    mutation updatePlant(
        $id: ID!
        $name: String
        $sensorFrequency: Int
        $wateringTime: Int
    ) {
        updatePlant(
            id: $id
            name: $name
            sensorFrequency: $sensorFrequency
            wateringTime: $wateringTime
        ) {
            id
            name
            sensorFrequency
            wateringTime
        }
    }
`;

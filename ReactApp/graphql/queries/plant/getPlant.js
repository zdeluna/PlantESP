import gql from 'graphql-tag';

export const GET_PLANT = gql`
    query getPlant($id: ID!) {
        plant(id: $id) {
            name
            id
            sensor_readings {
                datetime
                temperature
                humidity
                soil_moisture
            }
            water_datetimes
            sensorFrequency
            wateringTime
        }
    }
`;

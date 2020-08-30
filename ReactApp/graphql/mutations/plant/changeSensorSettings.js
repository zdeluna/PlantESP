import gql from 'graphql-tag';

export const CHANGE_SENSOR_SETTINGS = gql`
    mutation changeSensorSettings($sensorFrequency: Int, $wateringTime: Int) {
        changeSensorSettings(
            sensorFrequency: $sensorFrequency
            wateringTime: $wateringTime
        ) {
            success
        }
    }
`;

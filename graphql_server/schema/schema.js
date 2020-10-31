import { gql } from "apollo-server";

const schema = gql`
    scalar DateTime

    type CreateUserResponse {
        user: User
        success: Boolean!
        message: String
    }

    type Plant {
        id: ID!
        user: User!
        name: String!
        sensor_readings: [SensorReading]
        water_datetimes: [DateTime]
        sensorFrequency: Int
        wateringTime: Int
    }

    type User {
        id: ID!
        username: String!
        password: String!
        email: String!
        plants: [Plant]
    }

    type Token {
        token: String!
    }

    type WaterDateTime {
        datetime: DateTime
    }

    type SensorReading {
        datetime: DateTime
        temperature: Int
        humidity: Int
        soil_moisture: Int
    }

    type CreatePlantResponse {
        success: Boolean!
        id: ID!
    }

    type DeletePlantResponse {
        success: Boolean!
        id: ID!
    }

    type CreateSensorReadingResponse {
        success: Boolean!
    }

    type AddWateringTimeResponse {
        success: Boolean!
    }

    type WaterPlantResponse {
        success: Boolean!
    }

    type ChangeSensorSettingsResponse {
        success: Boolean!
    }

    type Query {
        users(id: String!): User!
        plants: [Plant]
        plant(id: ID!): Plant!
    }

    type Mutation {
        createUser(email: String!, username: String!, password: String!): Token
        signInUser(login: String!, password: String!): Token!
        waterPlant(id: ID!): WaterPlantResponse
        createPlant(name: String!): CreatePlantResponse
        deletePlant(id: ID!): DeletePlantResponse
        updatePlant(
            id: ID!
            name: String
            sensorFrequency: Int
            wateringTime: Int
            water_datetimes: [DateTime]
        ): Plant
        createSensorReading(
            plantId: ID!
            datetime: DateTime!
            temperature: Int
            humidity: Int
            soil_moisture: Int
        ): CreateSensorReadingResponse
        changeSensorSettings(
            plantId: ID!
            sensorFrequency: Int
            wateringTime: Int
        ): ChangeSensorSettingsResponse
        addWateringTime(
            plantId: ID!
            datetime: DateTime!
        ): AddWateringTimeResponse
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;

export { schema };

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
        temperatures: [Temperature]
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

    type Temperature {
        datetime: DateTime
        value: Int
    }

    type Humidity {
        datetime: DateTime
        value: Int
    }

    type CreatePlantResponse {
        success: Boolean!
        id: ID!
    }

    type CreateReadingResponse {
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
        createPlant(name: String!): CreatePlantResponse
        updatePlant(id: ID!, name: String): Plant
        createTemperatureReading(
            plantId: ID!
            value: Int!
            datetime: DateTime!
        ): CreateReadingResponse
        createHumidityReading(
            plantId: ID!
            value: Int!
            datetime: DateTime!
        ): CreateReadingResponse
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;

export { schema };

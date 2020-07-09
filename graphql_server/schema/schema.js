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
        temperature: DateTime
    }

    type CreatePlantResponse {
        success: Boolean!
        id: ID!
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
        updatePlant(id: ID!, name: String, temperature: Int): Plant
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;

export { schema };

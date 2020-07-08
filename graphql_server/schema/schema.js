const schema = `

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
    temperature: Int

}

type CreatePlantResponse {
    success: Boolean!
    id: ID!
}

type Query {
    users(id: String!): User!
    plants:[Plant]
    plant(id: ID!): Plant!
}

type Mutation {
    createUser(email: String!, username: String!, password: String!): Token
    signInUser(login: String!, password: String!): Token!
    createPlant(name: String!): CreatePlantResponse
}

schema {
    query: Query,
    mutation: Mutation
}`;

export { schema };

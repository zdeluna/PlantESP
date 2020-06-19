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

type CreatePlantResponse {
    success: Boolean!
    id: ID!
}



type Query {
    getUser(id: String!): User!
}

type Mutation {
    createUser(email: String!, username: String!, password: String!): Token
    signInUser(login: String!, password: String!): Token!
    createPlant(name: String!, userId: ID!): CreatePlantResponse
}

schema {
    query: Query,
    mutation: Mutation
}`;

export { schema };

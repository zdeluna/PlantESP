const schema = `

type CreateUserResponse {
    user: User
    success: Boolean!
    message: String
}

type User {
    id: ID!
    username: String!
    password: String!
    email: String!
}

type Token {
    token: String!
}


type Query {
    getUser(id: String!): User!
}

type Mutation {
    createUser(email: String!, username: String!, password: String!): Token!
}

schema {
    query: Query,
    mutation: Mutation
}`;

export { schema };

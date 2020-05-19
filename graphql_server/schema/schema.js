const schema = `

type CreateUserResponse {
    user: User
    success: Boolean!
    message: String
}

type User {
    id: String!
    email: String!
}

type Query {
    getUser(id: String!): User!
}

type Mutation {
    createUser(email: String!): CreateUserResponse!
}

schema {
    query: Query,
    mutation: Mutation
}`;

export { schema };

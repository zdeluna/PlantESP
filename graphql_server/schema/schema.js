const schema = `
type Query {
    getUser(id: String!): User!
}

type User {
    id: String!
    email: String!
}

schema {
    query: Query
}`;

export { schema };

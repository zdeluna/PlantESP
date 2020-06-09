import gql from 'graphql-tag';

export const CREATE_USER = gql`
    mutation createUser(
        $username: String!
        $email: String
        $password: String!
    ) {
        createUser(username: $username, email: $email, password: $password) {
            token
        }
    }
`;

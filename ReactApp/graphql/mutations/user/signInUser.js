import gql from 'graphql-tag';

export const LOG_IN_USER = gql`
    mutation signInUser($login: String!, $password: String!) {
        signInUser(login: $login, password: $password) {
            token
        }
    }
`;

import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {onError} from 'apollo-link-error';
import {ApolloProvider} from '@apollo/react-hooks';
import {from} from 'apollo-boost';
import AsyncStorage from '@react-native-community/async-storage';
import {Providers} from './Providers';

let GRAPHQL_URI =
    'https://bj6gqabbda.execute-api.us-east-2.amazonaws.com/dev/graphql';

const httpLink = createHttpLink({
    uri: GRAPHQL_URI,
    headers: {
        'client-name': 'Plant ESP [React App]',
        'client-version': '1.0.0',
    },
});

const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
        graphQLErrors.map(({message, locations, path}) => {
            // If the user is not authenticated, remove the token in local storage which will proceed the user to the login screen
            if (message === '401: Unauthorized') {
                //localStorage.setItem('token', null);
                client.cache.reset();
            }
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            );
        });

    if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext(async (_, {headers}) => {
    const token = await AsyncStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const cache = new InMemoryCache({dataIdFromObject: object => object.id});
const client = new ApolloClient({
    cache,
    link: from([authLink, errorLink, httpLink]),
});

const [signInUser] = useMutation(LOG_IN_USER, {
    async onCompleted({signInUser}) {
        console.log('logged in');
        await AsyncStorage.setItem('token', signInUser.token);
        console.log(signInUser.token);
    },
});

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return (
        <ApolloProvider client={client}>
            <AuthContext.Provider
                value={{
                    user,
                    login: () => {
                        setUser({username: 'bob'});
                    },
                    logout: () => {},
                }}>
                {children}
            </AuthContext.Provider>
        </ApolloProvider>
    );
};

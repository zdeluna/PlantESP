/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {onError} from 'apollo-link-error';
import {ApolloProvider} from '@apollo/react-hooks';
import {from} from 'apollo-boost';
import Home from './Home';
import AsyncStorage from '@react-native-community/async-storage';

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

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Home />
            </ApolloProvider>
        );
    }
}

export default App;

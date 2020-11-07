import React, {useState} from 'react';
import 'react-native-gesture-handler';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {onError} from 'apollo-link-error';
import {useMutation, useApolloClient} from '@apollo/react-hooks';
import {from} from 'apollo-boost';
import AsyncStorage from '@react-native-community/async-storage';
import {Providers} from './Providers';
import {LOG_IN_USER} from '../graphql/mutations/user/signInUser';
import {CREATE_USER} from '../graphql/mutations/user/createUser';

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
    const client = useApolloClient();
    const [user, setUser] = useState(null);

    const [signInUser] = useMutation(LOG_IN_USER, {
        errorPolicy: 'all',
        async onCompleted({signInUser}) {
            await AsyncStorage.setItem('user', signInUser.token);
            setUser(signInUser.token);
        },
    });

    const [createUser] = useMutation(CREATE_USER, {
        errorPolicy: 'all',
        async onCompleted({createUser}) {
            await AsyncStorage.setItem('token', createUser.token);
            setUser(createUser.token);
        },
    });

    return (
        <AuthContext.Provider
            value={{
                user,
                login: async (login, password) => {
                    await signInUser({
                        variables: {
                            login: login,
                            password: password,
                        },
                    });
                },
                logout: () => {
                    setUser(null);
                    AsyncStorage.removeItem('user');
                },
                signUp: async (username, email, password) => {
                    await createUser({
                        variables: {
                            username: username,
                            email: email,
                            password: password,
                        },
                    });
                },
            }}>
            {children}
        </AuthContext.Provider>
    );
};

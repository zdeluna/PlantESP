import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormField from './FormField';
import formData from './FormData';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {CREATE_USER} from '../graphql/mutations/user/createUser';
import {useMutation, useApolloClient} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';

const SignUp = props => {
    const [formValues, handleFormValueChange, setFormValues] = formData({
        username: '',
        email: '',
        password: '',
    });

    const client = useApolloClient();

    const [createUser] = useMutation(CREATE_USER, {
        async onCompleted({createUser}) {
            await AsyncStorage.setItem('token', createUser.token);
        },
    });

    const handleCreateUser = () => {
        createUser({
            variables: {
                username: formValues.username,
                email: formValues.email,
                password: formValues.password,
            },
        });
    };

    return (
        <View style={styles.container}>
            <Text
                style={{
                    fontSize: 24,
                    textAlign: 'center',
                    fontWeight: '300',
                    paddingBottom: 30,
                }}>
                Sign Up
            </Text>
            <FormField
                label="Username"
                formKey="username"
                placeholder="Your username"
                handleFormValueChange={handleFormValueChange}
            />
            <FormField
                label="Email"
                formKey="email"
                placeholder="Your email"
                textInputProps={{autoCapitalize: 'none'}}
                handleFormValueChange={handleFormValueChange}
            />
            <FormField
                label="Password"
                formKey="password"
                placeholder="Your password"
                textInputProps={{autoCapitalize: 'none'}}
                handleFormValueChange={handleFormValueChange}
            />
            <Button
                style={styles.button}
                onPress={handleCreateUser}
                title="Sign Up"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        margin: 20,
    },
    header: {
        fontSize: 20,
        paddingTop: 30,
    },
    formText: {
        fontSize: 20,
        padding: 10,
        paddingLeft: 0,
    },
    button: {
        fontSize: 20,
        paddingTop: 20,
    },
});

export default SignUp;

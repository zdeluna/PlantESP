import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormField from './FormField';
import formData from './FormData';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LOG_IN_USER} from '../graphql/mutations/user/signInUser';
import {useMutation, useApolloClient} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';

const Login = ({navigation}) => {
    const [formValues, handleFormValueChange, setFormValues] = formData({
        login: '',
        password: '',
    });

    const client = useApolloClient();

    const [signInUser] = useMutation(LOG_IN_USER, {
        async onCompleted({signInUser}) {
            console.log('logged in');
            await AsyncStorage.setItem('token', signInUser.token);
            console.log(signInUser.token);
        },
    });

    const handleLogInUser = () => {
        signInUser({
            variables: {
                login: formValues.login,
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
                Log In
            </Text>
            <FormField
                label="Username or Email"
                formKey="login"
                placeholder="Your username or email"
                handleFormValueChange={handleFormValueChange}
                textInputProps={{autoCapitalize: 'none'}}
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
                onPress={handleLogInUser}
                title="Log In"
            />
            <Button
                style={styles.button}
                title="Not registered?"
                onPress={() => {
                    navigation.navigate('SignUp');
                }}
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

export default Login;

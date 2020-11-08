import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormField from '../../components/FormField';
import formData from '../../hooks/formData';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useMutation, useApolloClient} from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../../src/AuthProvider';
import AlertBanner from '../../components/AlertBanner';

const SignUp = ({navigation}) => {
    const {formValues, handleFormValueChange, setFormValues} = formData({
        username: '',
        email: '',
        password: '',
    });

    const [showAlert, setShowAlert] = useState('');
    const {signUp} = useContext(AuthContext);

    const handleCreateUser = async () => {
        try {
            const response = await signUp(
                formValues.username,
                formValues.email,
                formValues.password,
            );
        } catch (error) {
            switch (error.message) {
                case 'GraphQL error: Username already exists.':
                    setShowAlert('Username already exists.');
                    break;
                case 'GraphQL error: Email already in use.':
                    setShowAlert('Email already in use.');
                    break;
                default:
                    setShowAlert('Error in request.');
                    break;
            }
        }
    };

    const ShowAlert = () => {
        if (showAlert) return <AlertBanner message={showAlert} />;
        else return null;
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
                textInputProps={{autoCapitalize: 'none'}}
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
            <Button
                style={styles.button}
                title="Already registered"
                onPress={() => {
                    navigation.navigate('Login');
                }}
            />
            <ShowAlert />
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

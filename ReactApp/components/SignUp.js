import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormField from './FormField';
import formData from './FormData';

const SignUp = props => {
    const [formValues, handleFormValueChange, setFormValues] = formData({
        username: '',
        email: '',
        password: '',
    });
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
});

export default SignUp;

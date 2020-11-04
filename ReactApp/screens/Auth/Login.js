import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FormField from '../../components/FormField';
import formData from '../../hooks/formData';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useMutation, useApolloClient} from '@apollo/react-hooks';
import {AuthContext} from '../../src/AuthProvider';

const Login = ({navigation}) => {
    const {formValues, handleFormValueChange, setFormValues} = formData({
        login: '',
        password: '',
    });

    const [showAlert, setShowAlert] = useState(false);
    const {login} = useContext(AuthContext);

    const handleLogInUser = async () => {
        try {
            const response = await login(formValues.login, formValues.password);
            console.log('Log in response: ');
            console.log(response);
        } catch (error) {
            console.log('error in login in handle');
            console.log(error);
        }
    };

    const ShowAlert = () => {
        if (showAlert) return <AlertBanner message={'Error'} />;
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

export default Login;

import React from 'react';
import renderer from 'react-test-renderer';
import FormField from '../../components/FormField';
import formData from '../../hooks/formData';
import {TextInput} from 'react-native';
import {renderHook, act} from '@testing-library/react-hooks';

describe('FormField', () => {
    const testFormObject = {email: 'test@gmail.com'};

    test('Text input is rendered', () => {
        const {result} = renderHook(() => formData(testFormObject));

        const testRenderer = renderer.create(
            <FormField
                label="Email"
                formKey="email"
                placeholder="Your email."
                handleFormValueChange={result.current.handleFormValueCahnge}
            />,
        );

        expect(testRenderer.toJSON()).toMatchSnapshot();
    });
});

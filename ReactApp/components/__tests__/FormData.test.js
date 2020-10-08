import React from 'react';
import renderer from 'react-test-renderer';
import formData from '../../components/FormData';
import {renderHook, act} from '@testing-library/react-hooks';

describe('FormData', () => {
    let testFormObject = {login: 'test@gmail.com', password: '12345'};

    test('formValues are initialized to parameters', () => {
        let testRenderer = renderer.ReactTestRenderer;
        const {result} = renderHook(() => formData(testFormObject));

        expect(result.current.formValues.login).toBe(testFormObject.login);
        expect(result.current.formValues.password).toBe(
            testFormObject.password,
        );
    });

    test('formValues change when handleFormValuesChange is called', () => {
        let testRenderer = renderer.ReactTestRenderer;
        const {result} = renderHook(() => formData(testFormObject));

        testFormObject.login = 'test@yahoo.com';

        act(() => {
            result.current.handleFormValueChange('login', 'test@yahoo.com');
        });

        expect(result.current.formValues.login).toBe(testFormObject.login);
    });
});

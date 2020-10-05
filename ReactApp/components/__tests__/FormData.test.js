import React from 'react';
import renderer from 'react-test-renderer';
import formData from '../../components/FormData';
import {renderHook, act} from '@testing-library/react-hooks';

function testComponent(testFormObject) {
    const [formValues, handleFormValueChange, setFormValues] = formData(
        testFormObject,
    );
}

describe('FormData', () => {
    let testFormObject = {login: 'test@gmail.com', password: '12345'};

    let testRenderer = renderer.ReactTestRenderer;
    const {result} = renderHook(() => formData(testFormObject));
    it('formValues are initialized to parameters', () => {
        expect(result.current[0].login).toBe(testFormObject.login);
        //expect(formValues.password).toBe(testFormObject.password);
        console.log(result.current);
    });
});

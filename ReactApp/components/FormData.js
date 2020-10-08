import {useState, useCallback} from 'react';

const formData = values => {
    const [formValues, setFormValues] = useState({
        ...values,
    });

    const handleFormValueChange = (key, value) => {
        setFormValues({
            ...formValues,
            [key]: value,
        });
    };

    return {formValues, handleFormValueChange};
};

export default formData;

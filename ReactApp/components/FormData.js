import {useState} from 'react';

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

    return [formValues, handleFormValueChange, setFormValues];
};

export default formData;

import { useState } from 'react';

const useForm = (callback: CallableFunction, initState: any) => {
    const [inputs, setInputs] = useState(initState);

    const handleSubmit = (event: any) => {
        if (event) {
            event.preventDefault();
        }
        callback();
    };

    const handleInputChange = (event: any) => {
        event.persist();
        setInputs((inputs: String) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    };

    return { inputs, handleSubmit, handleInputChange, setInputs };
};

export default useForm;
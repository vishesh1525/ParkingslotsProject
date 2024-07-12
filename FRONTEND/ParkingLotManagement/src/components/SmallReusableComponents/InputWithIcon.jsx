import React, { useState } from 'react';
import InputField from './InputField';

function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission
}

function InputWithIcon() {
    const [formValues, setFormValues] = useState({
        username: '',
        age: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <InputField 
                label="Enter your name:" 
                type="text" 
                name="username" 
                value={formValues.username} 
                onChange={handleChange}
            />
            <InputField 
                label="Enter your age:" 
                type="number" 
                name="age" 
                value={formValues.age} 
                onChange={handleChange}
            />
            <div className="flex justify-center">
                <input 
                    type="submit" 
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
                />
            </div>
        </form>
    );
}

export default InputWithIcon;

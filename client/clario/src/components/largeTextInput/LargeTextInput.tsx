import React, {useState} from 'react';

interface LargeTextInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

const LargeTextInput: React.FC<LargeTextInputProps> = (props) => {

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (props.onChange) props.onChange(value);
    };


    return (
        <>
        <textarea
            value={props.value || ""}
            onChange={handleChange}
            rows={10}        // height
            cols={60}        // width
            placeholder={props.placeholder}
            className='bg-gray-900'
            style={{
                width: "100%",
                padding: "1rem",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                resize: "vertical",
                boxSizing: "border-box",
            }}
        />
        
        
        
        
        </>
    )
}


export default LargeTextInput;
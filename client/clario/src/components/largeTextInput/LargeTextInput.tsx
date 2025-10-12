import React, {useState} from 'react';

interface LargeTextInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const LargeTextInput: React.FC<LargeTextInputProps> = (props) => {
    const [text, setText] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setText(value);
        if(props.onChange) props.onChange(value);
    }


    return (
        <>
        <textarea
            value={text}
            onChange={handleChange}
            rows={10}        // height
            cols={60}        // width
            placeholder={props.placeholder}
            style={{
                width: "100%",
                padding: "1rem",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "1px solid #ccc",
                resize: "vertical", // allow vertical resizing only
                left: "-100px",
                position: "relative",
                boxSizing: "border-box", // ensures width doesn't break

            }}
        />
        
        
        
        
        </>
    )
}


export default LargeTextInput;
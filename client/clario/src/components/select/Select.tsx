import React from 'react';

interface SelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options }) => {
    return (
        <label>
            {label}:
            <select value={value} onChange={onChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
        </label>
    );
};

export default Select;
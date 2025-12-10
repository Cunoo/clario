import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

type SelectProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string; // added
};

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  className = "",
}) => (
  <div className="w-full">
    {label && <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={` border rounded-lg p-2 text-gray-900 ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default Select;

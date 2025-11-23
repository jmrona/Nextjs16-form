import React from 'react';

type DropdownProps = {
  label: string;
  name: string;
  id: string;
  options: { value: string; label: string }[];
  className?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  defaultValue?: string;
}

export default function Dropdown({
  label,
  name,
  id,
  options,
  className,
  error,
  required,
  placeholder,
  defaultValue,
  ...rest
}: DropdownProps & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={`flex flex-col ${className ?? ''}`}>
      <label htmlFor={id} className="font-medium">{label} {required && '*'}</label>

      <select
        key={defaultValue}
        name={name}
        id={id}
        className="border border-gray-300 p-2 rounded"
        required={required}
        defaultValue={defaultValue}
        {...rest} >
        <option key="" value="" className='bg-black' hidden>
          {placeholder ?? ''}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className='bg-black'>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-600 text-pretty">{error}</p>}
    </div >
  );
}
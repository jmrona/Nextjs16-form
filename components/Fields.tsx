import React from 'react';

type FieldProps = {
  label: string;
  name: string;
  id: string;
  type?: 'text' | 'email' | 'password' | 'number';
  className?: string;
  error?: string;
  required?: boolean;
}

export default function Field({
  label,
  name,
  id,
  type = 'text',
  className,
  error,
  required,
  ...rest
}: FieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`flex flex-col ${className ?? ''}`}>
      <label htmlFor={id} className="font-medium">{label} {required && '*'}</label>
      <input
        type={type}
        name={name}
        id={id}
        className="border border-gray-300 p-2 rounded"
        required={required}
        {...rest} />
      {error && <p className="text-red-600 text-pretty">{error}</p>}
    </div>
  );
}
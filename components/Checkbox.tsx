import React from "react";

type CheckboxProps = {
  label: string;
  disabled?: boolean;
  name: string;
  id: string;
  value?: string;
  error?: string;
  required?: boolean;
  defaultChecked?: boolean;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export default function Checkbox({
  label,
  disabled = false,
  name,
  id,
  value,
  error,
  required,
  className,
  defaultChecked,
  ...rest
}: CheckboxProps) {
  return (
    <div className={`flex flex-col items-center ${className ?? ''}`} {...rest}>
      <div className="flex gap-3">
        <input
          type="checkbox"
          disabled={disabled}
          name={name}
          id={id}
          value={value}
          required={required}
          defaultChecked={defaultChecked}
        />
        {label && (
          <label htmlFor={id} className={`ml-2 ${disabled ? 'text-gray-400' : ''}`}>
            {label}
          </label>
        )}
      </div>
      {error && <p className="text-red-600 text-pretty">{error}</p>}
    </div>
  )
}
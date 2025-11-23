import React from 'react';
import Checkbox from './Checkbox';

type CheckboxGroupProps = {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  className?: string;
  error?: string;
  required?: boolean;
  defaultValue?: string[];
}

export default function CheckboxGroup({
  label,
  name,
  options,
  className,
  error,
  required,
  defaultValue,
  ...rest
}: CheckboxGroupProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col ${className ?? ''}`} {...rest}>
      <span className="font-medium mb-2">{label} {required && '*'}</span>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center gap-3">
            <Checkbox
              name={name}
              id={option.value}
              value={option.value}
              label={option.label}
              defaultChecked={defaultValue?.some(value => value === option.value)}
            />
          </div>
        ))}
      </div>
      {error && <p className="text-red-600 text-pretty">{error}</p>}
    </div>
  );
}
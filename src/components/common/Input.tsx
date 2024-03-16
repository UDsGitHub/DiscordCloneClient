import { RequiredText } from "components";
import { useEffect, useRef, useState } from "react";

interface InputProps {
  required?: boolean;
  type: "text" | "email" | "password" | "number";
  validator?: (val: string) => string[];
  value: string | number;
  onChange: (value: any) => any;
  label: string;
  id: string;
  min?: number;
  max?: number;
}

export default function Input({
  type,
  label,
  value,
  validator,
  onChange,
  id,
  required = false,
  min = 2,
  max = 100,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleValidation = () => {
    const validationErrors = validator
      ? validator(inputRef.current ? inputRef.current.value : (value as string))
      : [];
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors([]);
    }
  };

  // useEffect(() => {
  //   const validationErrors = validator ? validator() : []
  //   if (validationErrors.length === 0) {
  //     setErrors([]);
  //   }
  // }, [value])

  return (
    <>
      <label htmlFor={id} className="mt-4 mb-2 font-bold text-xs">
        <RequiredText>{label}</RequiredText>
      </label>
      <input
        type={type}
        id={id}
        required={required}
        className="p-2 font-normal outline-none rounded-sm bg-grey-800"
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        onBlur={handleValidation}
        ref={inputRef}
      />
      <div className="mt-2">
        {errors.map((error, index) => (
          <p className="text-red-500 text-sm" key={index}>
            {error}
          </p>
        ))}
      </div>
    </>
  );
}

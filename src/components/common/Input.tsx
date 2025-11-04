import { RequiredText } from "components";
import React, { useRef, useState } from "react";

interface InputProps {
  required?: boolean;
  type: HTMLInputElement["type"];
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
  const [localType, setLocalType] = useState<HTMLInputElement["type"]>(type);
  const [isObscure, setIsObscure] = useState(true);
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

  const toggleVisibilty = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLocalType((prev) => (prev === "text" ? "password" : "text"));
    setIsObscure((prev) => !prev);
  };

  return (
    <>
      <label htmlFor={id} className="mt-4 mb-2 font-bold text-xs">
        <RequiredText>{label}</RequiredText>
      </label>
      <div className="font-normal rounded-sm bg-grey-800 flex items-center p-2">
        <input
          type={type != "password" ? type : localType}
          id={id}
          required={required}
          className="w-full h-full outline-none bg-transparent"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          onBlur={handleValidation}
          ref={inputRef}
        />
        {type === "password" && (
          <button onClick={toggleVisibilty}>
            {isObscure ? (
              <svg
                className="w-6 h-6 text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                />
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
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

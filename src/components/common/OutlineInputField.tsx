import React from "react";

type Props = {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const OutlineInputField = ({
  icon,
  placeholder,
  value,
  onChange,
  className = "",
}: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [showOutline, setShowOutline] = React.useState(false);

  const handleFormFocus = () => {
    inputRef.current && inputRef.current.focus();
    setShowOutline(true);
  };

  const handleChange = (value: string) => {
    onChange(value);
    setShowOutline(false);
  };

  return (
    <div
      className={`flex items-center rounded-md ${
        showOutline &&
        "focus-within:outline focus-within:outline-2 focus-within:outline-blue-400"
      } caret-grey-300 ${className}`}
      tabIndex={0}
      onFocus={handleFormFocus}
      onChange={() => setShowOutline(false)}
    >
      {icon}
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        className="bg-transparent w-full outline-none text-grey-400"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default OutlineInputField;

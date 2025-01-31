import React, { useRef, useState } from "react";

type Props = {
  value: string;
  placeHolder: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
  onSubmit: () => void;
};

const MessageInput = ({ value, placeHolder, onChange, onBlur, onSubmit }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showOutline, setShowOutline] = useState(false);

  function handleFormFocus() {
    inputRef.current && inputRef.current.focus();
    setShowOutline(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit()
  }

  return (
    <form
      className={`bg-grey-350 p-4 rounded-xl ${
        showOutline &&
        "focus-within:outline focus-within:outline-4 focus-within:outline-blue-400"
      } caret-grey-300 flex`}
      tabIndex={0}
      onFocus={handleFormFocus}
      onChange={() => setShowOutline(false)}
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder={placeHolder}
        className="bg-transparent w-full outline-none text-grey-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={(e) => onBlur(e.target.value)}
      />
      <button type="submit">
        <svg
          className="w-4 h-4 text-grey-400 hover:text-grey-300 duration-300 rotate-90"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
        </svg>
      </button>
    </form>
  );
};

export default MessageInput;

import React from "react";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
};

const AddServerBaseForm = ({
  title,
  subtitle,
  children,
  footer,
  onClose,
  onSubmit,
}: Props) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <button onClick={onClose}>
        <svg
          className="w-6 h-6 text-grey-400 absolute right-4 top-4"
          aria-hidden="true"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z"
          ></path>
        </svg>
      </button>
      <div className="px-4 pb-2">
        <h3 className="text-center text-grey-300 text-2xl font-bold mb-2">
          {title}
        </h3>
        <p className="text-center text-grey-400 mb-5">{subtitle}</p>
        {children}
      </div>
      {footer}
    </form>
  );
};

export default AddServerBaseForm;

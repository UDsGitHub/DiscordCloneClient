import React from "react";

type Props = {
  isAddServerModalOpen: boolean;
  openAddServerModal: () => void;
};

const AddServerButton = ({
  isAddServerModalOpen,
  openAddServerModal,
}: Props) => {
  const handleClick = () => {
    openAddServerModal();
  };
  return (
    <div
      className={`w-full flex justify-center mb-2 relative [&>button]:hover:rounded-2xl [&>button]:hover:bg-green-500`}
    >
      <button
        className={`h-12 w-12 duration-300 flex justify-center items-center text-2xl ${
          isAddServerModalOpen
            ? "bg-green-500 text-white rounded-2xl"
            : "bg-grey-500 rounded-[50%]"
        }`}
        onClick={handleClick}
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>
      </button>
    </div>
  );
};

export default AddServerButton;

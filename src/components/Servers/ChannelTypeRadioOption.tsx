type Props = {
  selectedChannelType: 0 | 1;
  type: 0 | 1;
  onChange: (value: 0 | 1) => void;
};

const ChannelTypeRadioOption = ({
  selectedChannelType,
  type,
  onChange,
}: Props) => {
  return (
    <div
      className={`cursor-pointer flex items-center gap-3 px-3 py-[10px] w-full rounded-sm mb-2 ${
        selectedChannelType === type
          ? "bg-grey-400/10"
          : "bg-grey-700 hover:bg-grey-400/10"
      }`}
      onClick={() => onChange(type)}
    >
      <div>
        {type === 0 ? (
          <svg
            className="w-5 h-5"
            x="0"
            y="0"
            aria-hidden="true"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z"
            ></path>
            <path
              fill="currentColor"
              d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z"
            ></path>
          </svg>
        )}
      </div>
      <div>
        <p>{type === 0 ? "Text" : "Voice"}</p>
        <p className="text-xs">
          {type === 0
            ? "Send messages, images, GIFs, emoji, opinions, and puns"
            : "Hang out together with voice, video, and screen share"}
        </p>
      </div>
      <div className="ml-auto">
        {selectedChannelType === type ? (
          <svg
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="currentColor"
            ></path>
            <circle cx="12" cy="12" r="5" fill="currentColor"></circle>
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              fill="currentColor"
            ></path>
          </svg>
        )}
      </div>
    </div>
  );
};

export default ChannelTypeRadioOption;

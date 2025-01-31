import { TopbarLayout, VerticalLine } from "components";

interface Props {
  currentTab: number;
  onTabChange: (tabId: number) => void;
}

const FriendsTopbar = ({ currentTab, onTabChange }: Props) => {
  return (
    <TopbarLayout>
      <div className="flex items-center gap-4 text-grey-400">
        <div className="pl-2 flex items-center rounded-md cursor-default">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              aria-hidden="true"
              role="img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  fill="currentColor"
                  fillRule="nonzero"
                  d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"
                  transform="translate(2 4)"
                ></path>
                <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
              </g>
            </svg>
          </div>
          <span className="ml-2 text-left">Friends</span>
        </div>
        <VerticalLine />
        <button
          className={`px-2 duration-300 hover:bg-grey-400/10 rounded-md ${
            currentTab === 0
              ? "bg-grey-400/25 font-semibold text-white"
              : "bg-transparent"
          }`}
          onClick={() => onTabChange(0)}
        >
          Online
        </button>
        <button
          className={`px-2 duration-300 hover:bg-grey-400/10 rounded-md ${
            currentTab === 1
              ? "bg-grey-400/25 font-semibold text-white"
              : "bg-transparent"
          }`}
          onClick={() => onTabChange(1)}
        >
          All
        </button>
        <button
          className={`px-2 duration-300 hover:bg-grey-400/10 rounded-md ${
            currentTab === 2
              ? "bg-grey-400/25 font-semibold text-white"
              : "bg-transparent"
          }`}
          onClick={() => onTabChange(2)}
        >
          Pending
        </button>
        <button
          className={`duration-300 py-0.5 px-2 shadow-sm rounded-md
            ${
              currentTab === 3
                ? "bg-transparent outline outline-green-700 outline-2 font-semibold text-green-400"
                : "bg-green-700 hover:bg-green-800 text-white"
            }`}
          onClick={() => onTabChange(3)}
        >
          Add Friend
        </button>
      </div>
    </TopbarLayout>
  );
};

export default FriendsTopbar;

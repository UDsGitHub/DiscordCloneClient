import { Tooltip } from "components";
import { useModalContext } from "context";
import { CategoryType } from "model";

type Props = {
  category: CategoryType;
};

const CategoryListItem = ({ category }: Props) => {
  const { openCreateChannelModal: onOpen } = useModalContext();
  return (
    <button className="flex items-center justify-between w-full group mb-1 pr-4">
      <div className="text-xs flex items-center">
        <svg
          className="w-4 h-4 inline-block"
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
            d="m8 10 4 4 4-4"
          />
        </svg>
        <p className="inline-block group-hover:text-grey-300">
          {category.name}
        </p>
      </div>
      <Tooltip text="Create Channel" direction="top">
        <div className="hover:text-grey-300" onClick={() => onOpen(category.id)}>
          <svg
            aria-hidden="true"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6Z"
            ></path>
          </svg>
        </div>
      </Tooltip>
    </button>
  );
};

export default CategoryListItem;

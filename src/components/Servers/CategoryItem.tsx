import { CategoryType } from "model";
import CategoryLabel from "./CategoryLabel";
import ChannelList from "./ChannelList";

type Props = {
  category: CategoryType;
};

const CategoryItem = ({ category }: Props) => {
  return (
    <div key={category.id} className="mt-4 text-grey-400/75 text-sm">
      <CategoryLabel category={category} />
      <ChannelList channels={category.channels} />
    </div>
  );
};

export default CategoryItem;

import { CategoryType } from "model";
import CategoryItem from "./CategoryItem";

type Props = {
  categories: CategoryType[];
};

const CategoryList = ({ categories }: Props) => {
  return (
    <>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </>
  );
};

export default CategoryList;

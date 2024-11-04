import { BounceLoader } from "react-spinners";

type Props = {};

const PageLoader = (props: Props) => {
  return (
    <div className="h-full bg-grey-700">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <BounceLoader loading color="#5865f2" size={200} />
      </div>
    </div>
  );
};

export default PageLoader;

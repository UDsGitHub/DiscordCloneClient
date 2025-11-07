import { BeatLoader as Loader } from "react-spinners";

const BeatLoader = () => {
  return (
    <div className="absolute inset-0 bg-grey-700">
      <Loader loading color="#5865f2" size={200} />
    </div>
  );
};

export default BeatLoader;

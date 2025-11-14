import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CustomSkeleton = (props: SkeletonProps) => {
  return <Skeleton {...props} baseColor="#1e1f22" highlightColor="#2b2d31" />;
};

const ServerInviteLoader = () => {
  return (
    <div className="bg-grey-450 w-[450px] min-h-[250px] rounded-md flex flex-col gap-3 justify-center items-center text-white">
      <CustomSkeleton  height={20} width={250}/>
      <CustomSkeleton  height={20} width={180}/>
      <CustomSkeleton height={80} width={80} circle/>
      <CustomSkeleton height={45} width={180} />
    </div>
  );
};

export default ServerInviteLoader;

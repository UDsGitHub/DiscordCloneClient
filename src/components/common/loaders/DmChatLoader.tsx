import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CustomSkeleton = (props: SkeletonProps) => {
  return <Skeleton {...props} baseColor="#1e1f22" highlightColor="#2b2d31" />;
};

const DmChatLoader = () => {
  return (
    <div className="h-full w-full">
      <div className="p-2 px-4 h-12">
        <CustomSkeleton height={"100%"} />
      </div>
      <div
        style={{ height: "calc(100% - 40px - 56px - 1rem)" }}
        className="p-4 flex flex-col"
      >
        <div className="flex flex-col gap-2">
          <CustomSkeleton width={100} height={100} circle />
          <CustomSkeleton height={16} width={"20%"} />
          <CustomSkeleton height={16} width={"30%"} />
        </div>
        <div className="flex flex-col gap-4 mt-20">
          {Array(6)
            .fill(0)
            .map((it, i) => (
              <div>
                <CustomSkeleton height={40} width={"100%"} />
                {i % 3 == 1 && (
                  <div className="flex items-center gap-4 mt-6">
                    <div className=" h-[2px] w-full bg-[#3c3c3f]" />
                    <CustomSkeleton height={10} width={30} />
                    <div className="h-[2px] w-full bg-[#3c3c3f]" />
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      <div className="h-[64px] p-4">
        <CustomSkeleton height={"100%"} />
      </div>
    </div>
  );
};

export default DmChatLoader;

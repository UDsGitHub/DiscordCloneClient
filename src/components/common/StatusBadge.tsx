type StatusBadgeProps = {
  status?: string;
  size?: 'normal' | 'small';
};

const StatusBadge = ({ status, size = "normal" }: StatusBadgeProps) => {
  return (
    <div
      className={`absolute -right-0.5 -bottom-0.5 bg-green-500 ${size === 'normal' ? 'w-3.5 h-3.5' : 'w-3 h-3'} border-2 border-grey-600 rounded-full z-10 font-bold text-center text-xs cursor-default`}
    ></div>
  );
};

export default StatusBadge;

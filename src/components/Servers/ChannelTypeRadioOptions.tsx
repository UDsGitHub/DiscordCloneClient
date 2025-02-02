import ChannelTypeRadioOption from "./ChannelTypeRadioOption";

type Props = {
  selectedChannelType: 0 | 1;
  onChange: (value: 0 | 1) => void;
};

const ChannelTypeRadioOptions = ({ selectedChannelType, onChange }: Props) => {
  return (
    <div>
      <p className="text-xs font-semibold mb-2">CHANNEL TYPE</p>
      <ChannelTypeRadioOption selectedChannelType={selectedChannelType} type={0} onChange={onChange} />
      <ChannelTypeRadioOption selectedChannelType={selectedChannelType} type={1} onChange={onChange} />
    </div>
  );
};

export default ChannelTypeRadioOptions;

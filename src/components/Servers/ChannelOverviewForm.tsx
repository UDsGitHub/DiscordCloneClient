type Props = {
  channelNameValue: string;
  channelTopicValue: string;
  onChannelNameChange: (value: string) => void;
  onChannelTopicChange: (value: string) => void;
  showSaveChanges: boolean;
  saveChanges: () => void;
  resetChanges: () => void;
};

const ChannelOverviewForm = ({
  channelNameValue,
  channelTopicValue,
  onChannelNameChange,
  onChannelTopicChange,
}: Props) => {
  const handleChannelNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChannelNameChange(e.target.value);
  };

  const handleChannelTopicChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onChannelTopicChange(e.target.value);
  };

  return (
    <div className="text-sm h-full">
      <p className="mb-5">Overview</p>
      <label htmlFor="">
        <p className="mb-2 text-xs font-bold">CHANNEL NAME</p>
        <input
          type="text"
          className="bg-grey-800 outline-none w-full h-10 p-[10px] rounded-sm"
          value={channelNameValue}
          onChange={handleChannelNameChange}
          maxLength={100}
        />
      </label>
      <div className="h-[1px] bg-grey-400/25 w-full my-10"></div>
      <label htmlFor="">
        <p className="mb-2 text-xs font-bold">CHANNEL TOPIC</p>
        <textarea
          className="bg-grey-800 outline-none max-h-[272px] w-full rounded-sm p-[10px]"
          value={channelTopicValue}
          onChange={handleChannelTopicChange}
          maxLength={1024}
          rows={3}
          autoCorrect="off"
          placeholder="Let everyone know how to use this channel!"
        />
      </label>
      
      <div className="absolute bottom-4 left-4 flex items-center justify-between bg-grey-900 w-full max-w-[700px] p-[10px] pl-4 font-semibold text-white rounded-md shadow-md">
        <p>Careful — you have unsaved changes!</p>
        <div>
            <button className="text-grey-300 hover:underline mr-6">Reset</button>
            <button className="h-8 py-0.5 px-4 bg-green-600 hover:bg-green-700 rounded-sm duration-300">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default ChannelOverviewForm;

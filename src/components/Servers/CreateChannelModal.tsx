import { useModalContext, useServerContext } from "context";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import ChannelTypeRadioOptions from "./ChannelTypeRadioOptions";
import { CreateChannelRequestType, useCreateServerChannelMutation } from "api";
import { useNavigate } from "react-router-dom";

const CreateChannelModal = () => {
  const {
    isCreateChannelModalOpen: isOpen,
    closeCreateChannelModal: onClose,
    channelCategory,
  } = useModalContext();
  const [selectedChannelType, setSelectedChannelType] = useState<0 | 1>(0);
  const [channelName, setChannelName] = useState("");
  const [createServerChannel, { isLoading }] = useCreateServerChannelMutation();
  const { selectedServer, addChannelToServer, handleChannelSelect } = useServerContext();
  const navigate = useNavigate();

  const handleChannelTypeChange = (value: 0 | 1) => {
    setSelectedChannelType(value);
  };

  const resetForm = () => {
    setSelectedChannelType(0);
    setChannelName("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServer && channelName !== "") {
      const request: CreateChannelRequestType = {
        name: channelName,
        type: selectedChannelType,
        serverId: selectedServer.id,
        categoryId: channelCategory,
      };
      createServerChannel(request)
        .unwrap()
        .then((res) => {
          addChannelToServer(res.id, channelCategory);
          handleChannelSelect(res.id)
          navigate(`/channels/${selectedServer?.id}/${res.id}`);
          resetForm();
          onClose();
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-grey-500 rounded-lg overflow-hidden max-w-[460px] text-grey-300`}
      >
        <form onSubmit={handleFormSubmit}>
          <button onClick={onClose}>
            <svg
              className="w-6 h-6 text-grey-400 absolute right-4 top-4"
              aria-hidden="true"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z"
              ></path>
            </svg>
          </button>
          <div className="px-4 pb-2">
            <div className="mb-4">
              <p className="text-xl">Create Channel</p>
              <p className="text-xs text-grey-400">in Text Channels</p>
            </div>
            <ChannelTypeRadioOptions
              selectedChannelType={selectedChannelType}
              onChange={handleChannelTypeChange}
            />
            <div className="mb-2">
              <p className="text-xs font-semibold mb-2">CHANNEL NAME</p>
              <div className="flex gap-2 items-center bg-grey-800 h-10 text-sm px-3">
                <svg
                  className="w-4 h-4"
                  x="0"
                  y="0"
                  aria-hidden="true"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <input
                  type="text"
                  placeholder="new-channel"
                  className="bg-transparent w-full h-full outline-none"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  minLength={1}
                  maxLength={150}
                />
              </div>
            </div>
          </div>
          <div className="bg-grey-700 flex justify-end gap-4 p-4 text-xs">
            <button className="text-grey-300 hover:underline">Back</button>
            <button
              className={`w-[96px] h-[38px] duration-300 rounded-sm text-grey-300 font-semibold ${
                channelName === ""
                  ? "bg-purple-500/60 cursor-not-allowed"
                  : "bg-purple-500 hover:bg-purple-500/75"
              }`}
              onClick={handleFormSubmit}
              disabled={channelName === ""}
            >
              {!isLoading ? "Create" : <BeatLoader size={8} color="#D1D5DB" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateChannelModal;

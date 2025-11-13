import { useModalContext, useServerContext } from "context";
import { useEffect, useState } from "react";
import ChannelOverviewForm from "../Forms/ChannelOverviewForm";

type selectedTabType = "overview" | "other";

const ChannelSettingsModal = () => {
  const {
    isChannelSettingsModalOpen: isOpen,
    closeChannelSettingsModal: onClose,
    editingChannel,
    openDeleteChannelModal,
  } = useModalContext();
  const { selectedServer } = useServerContext();
  const [selectedTab, setSelectedTab] = useState<selectedTabType>("overview");
  const [channelNameValue, setChannelNameValue] = useState<string>(
    editingChannel?.name || ""
  );
  const [channelTopicValue, setChannelTopicValue] = useState<string>(
    editingChannel?.topic || ""
  );
  const [showSaveChanges, setShowSaveChanges] = useState<boolean>(false);

  const handleChannelNameChange = (value: string) => {
    setChannelNameValue(value);
  };

  const handleChannelTopicChange = (value: string) => {
    setChannelTopicValue(value);
  };

  const handleSaveChanges = () => {
    // Save changes
  };

  const handleResetChanges = () => {
    setChannelNameValue(editingChannel?.name || "");
    setChannelTopicValue(editingChannel?.topic || "");
    setShowSaveChanges(false);
  };

  useEffect(() => {
    if (
      channelNameValue !== editingChannel?.name ||
      channelTopicValue !== editingChannel?.topic
    ) {
      setShowSaveChanges(true);
    }
  }, [channelNameValue, channelTopicValue]);

  const getCategoryName = () => {
    if (selectedServer && editingChannel?.categoryId) {
      const category = selectedServer.categories.find(
        (category) => category.id === editingChannel.categoryId
      );
      if (category) {
        return `in ${category.name}`;
      }
    }
    return "";
  };

  const getTabStyles = (tab: selectedTabType) => {
    return `py-[6px] px-[10px] rounded-md cursor-pointer mb-0.5 ${
      selectedTab === tab
        ? "bg-[#404249] text-grey-300 font-semibold"
        : "hover:bg-grey-450"
    }`;
  };

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed top-0 left-0 right-0 bottom-0 bg-grey-450 z-50`}
    >
      <div className="flex h-full">
        <div className="grow shrink-0 basis-[218px] bg-grey-700 pl-5 pt-[60px] pr-4 text-sm text-grey-400">
          <p className="uppercase mb-2 text-xs">
            #{editingChannel?.name} {getCategoryName()}
          </p>
          <nav className="">
            <ul>
              <li
                className={getTabStyles("overview")}
                onClick={() => setSelectedTab("overview")}
              >
                Overview
              </li>
              <li
                className={
                  "py-[6px] px-[10px] rounded-md cursor-pointer mb-0.5 hover:bg-grey-450 flex items-center justify-between active:bg-[#404249] active:text-grey-300"
                }
                onClick={() =>
                  editingChannel &&
                  openDeleteChannelModal(editingChannel, false)
                }
              >
                <p>Delete Channel</p>

                <svg
                  aria-hidden="true"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z"
                  ></path>
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex-auto basis-[800px] text-grey-400">
          <div className="max-w-[740px] h-full relative px-10 pt-[60px] pb-[80px]">
            <div
              className="absolute -right-4 flex flex-col items-center cursor-pointer"
              onClick={onClose}
            >
              <div className="rounded-full w-9 h-9 border-2 border-grey-400 flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z"
                  ></path>
                </svg>
              </div>
              <p className="text-sm font-semibold">ESC</p>
            </div>

            <div className="h-full">
              {selectedTab === "overview" && (
                <ChannelOverviewForm
                  channelNameValue={channelNameValue}
                  channelTopicValue={channelTopicValue}
                  onChannelNameChange={handleChannelNameChange}
                  onChannelTopicChange={handleChannelTopicChange}
                  showSaveChanges={showSaveChanges}
                  saveChanges={handleSaveChanges}
                  resetChanges={handleResetChanges}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelSettingsModal;

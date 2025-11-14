import { useModalContext } from "context";
import { useEffect, useRef, useState } from "react";
import {
  useGetFriendsQuery,
  useLazyGetServerInviteCodeQuery,
  useSendServerInviteMutation,
} from "api";
import OutlineInputField from "components/common/OutlineInputField";
import { FriendUser } from "model";

interface FriendUserListItem extends Omit<FriendUser, "serverInvites"> {
  hasInvite: boolean;
  isLoading: boolean;
}

const InvitePeopleModal = () => {
  const {
    isInviteModalOpen: isOpen,
    closeInviteModal: onClose,
    inviteModalContext,
  } = useModalContext();
  const { data: friends, isLoading: isLoadingFriends } = useGetFriendsQuery();
  const [getServerInviteCode, { isLoading, isFetching }] =
    useLazyGetServerInviteCodeQuery();
  const [sendServerInvite] = useSendServerInviteMutation();
  const [friendsList, setFriendsList] = useState<FriendUserListItem[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [inviteLink, setInviteLink] = useState("");
  const inviteLinkRef = useRef<HTMLInputElement>(null);
  const isFetchingInviteLink = isLoading || isFetching;
  const filteredList = friendsList.filter((it) =>
    it.displayName.toLowerCase().includes(searchValue)
  );

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleInviteClick = async (userId: string) => {
    if (!inviteModalContext?.server || !inviteLink) return;
    try {
      setFriendsList((prev) =>
        prev.map((it) => (it.id === userId ? { ...it, isLoading: true } : it))
      );
      await sendServerInvite({
        userId,
        inviteLink,
      });
      setFriendsList((prev) =>
        prev.map((it) => (it.id === userId ? { ...it, hasInvite: true } : it))
      );
    } catch (e) {
      console.log(e);
    }
    setFriendsList((prev) =>
      prev.map((it) => (it.id === userId ? { ...it, isLoading: false } : it))
    );
  };

  const handleInviteLinkCopy = () => {
    if (inviteLinkRef.current && !!inviteLink) {
      inviteLinkRef.current.select();
      navigator.clipboard
        .writeText(inviteLink)
        .then(() => {
          console.log("Text copied to clipboard successfully!");
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };

  const generateInviteLink = async () => {
    if (inviteModalContext !== undefined) {
      const { inviteCode } = await getServerInviteCode(
        inviteModalContext.server.id
      ).unwrap();
      const baseUrl = window.location.origin;
      const link = `${baseUrl}/invite/${inviteCode}`;
      setInviteLink(link);
    }
  };

  useEffect(() => {
    if (isOpen && !inviteLink) {
      generateInviteLink();
    }
  }, [isOpen]);

  useEffect(() => {
    setFriendsList(
      friends?.map((it) => ({
        ...it,
        isLoading: false,
        hasInvite:
          inviteModalContext !== undefined &&
          it.serverInvites.includes(inviteModalContext.server.id),
      })) || []
    );
  }, [friends]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest(".modal")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className={`modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[460px] bg-grey-500 rounded-lg overflow-hidden text-grey-300`}
      >
        <button
          onClick={onClose}
          className=" text-grey-400 absolute right-4 top-4"
        >
          <svg
            className="w-6 h-6"
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
        <div className="p-4 pb-0">
          <div className="mb-6">
            <p className="text-xl">
              Invite friends to {inviteModalContext?.server.name}
            </p>
            <p className="text-xs text-grey-400">
              Recipients will land in # {inviteModalContext?.channel?.name}
            </p>
          </div>
          <OutlineInputField
            icon={
              <svg
                className="w-4 h-4"
                aria-label="Search"
                aria-hidden="false"
                role="img"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"
                ></path>
              </svg>
            }
            placeholder="Search for friends"
            value={searchValue}
            onChange={handleSearchChange}
            className="bg-grey-800 px-2 p-1 gap-2 text-sm"
          />
          <div className="h-[450px] overflow-y-auto mt-2">
            {!isLoadingFriends &&
              friends &&
              filteredList.map((it) => (
                <div
                  key={it.id}
                  className="cursor-default hover:bg-grey-450 flex items-center justify-between h-11 p-2 text-sm"
                >
                  <p>{it.displayName}</p>
                  <button
                    className={`duration-300 bg-grey-350 hover:bg-grey-300/25 h-full px-2 rounded-md ${
                      it.hasInvite ? "pointer-events-none" : ""
                    }`}
                    onClick={() => handleInviteClick(it.id)}
                  >
                    {it.isLoading || isFetchingInviteLink
                      ? "..."
                      : it.hasInvite
                      ? "Sent"
                      : "Invite"}
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="bg-grey-700 p-4 text-sm flex flex-col gap-3">
          <p>Or, send a server invite link to a friend</p>
          <div className="flex items-stretch bg-grey-800 border border-grey-450 p-1 pl-3 rounded-md">
            <input
              ref={inviteLinkRef}
              className="flex-grow bg-transparent py-2 outline-none"
              id="server-invite-link"
              type="text"
              readOnly
              onFocus={handleInviteLinkCopy}
              value={inviteLink}
            />
            <button
              className="cursor-pointer px-5 duration-300 bg-purple-500 hover:bg-purple-500/75 rounded-md font-semibold"
              onClick={handleInviteLinkCopy}
            >
              Copy
            </button>
          </div>
          {/* <p></p> TBD editing invite link... */}
        </div>
      </div>
    </div>
  );
};

export default InvitePeopleModal;

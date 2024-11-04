import { useState } from "react";
import FriendsList from "./FriendsList";
import FriendsTopbar from "./FriendsTopbar";
import AddFriendPage from "./AddFriendPage";
import { useGetFriendRequestsQuery, useGetFriendsQuery } from "api";
import PendingRequests from "./PendingRequests";
import FriendSearch from "./FriendSearch";
import { FriendRequest, User } from "model";

const FriendsPage = () => {
  const { data: friends, isLoading: isLoadingFriends } = useGetFriendsQuery();
  const { data: pendingRequests, isLoading: isLoadingRequests } =
    useGetFriendRequestsQuery();
  // const [friendsList, setFriendsList] = useState<User[]>(friends || []);
  // const [pendingUserList, setPendingUserList] = useState<FriendRequest[]>(
  //   pendingRequests || []
  // );
  const [searchString, setSearchString] = useState<string>("");
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (tabId: number) => {
    setCurrentTab(tabId);
  };

  const handleSearchChange = (val: string) => {
    setSearchString(val);
  };

  const filterPendingUsers = (userList: FriendRequest[]) => {
    if (searchString !== "") {
      return userList.filter(
        (friendUser) =>
          friendUser.user.displayName.includes(searchString) ||
          friendUser.user.username.includes(searchString)
      );
    }
    return userList;
  };

  const filterFriendUsers = (userList: User[]) => {
    if (searchString !== "") {
      return userList.filter(
        (friendUser) =>
          friendUser.displayName.includes(searchString) ||
          friendUser.username.includes(searchString)
      );
    }
    return userList;
  };

  const getContent = (tab: number) => {
    switch (tab) {
      case 0:
      case 1:
        return (
          <FriendsList
            friends={filterFriendUsers(friends || [])}
            isLoading={isLoadingFriends}
          />
        );
      case 2:
        return (
          <PendingRequests
            pendingRequests={filterPendingUsers(pendingRequests || [])}
            isLoading={isLoadingRequests}
          />
        );
      case 3:
        return <AddFriendPage />;
      default:
        return (
          <FriendsList
            friends={filterFriendUsers(friends || [])}
            isLoading={isLoadingFriends}
          />
        );
    }
  };

  return (
    <>
      <FriendsTopbar currentTab={currentTab} onTabChange={handleTabChange} />
      <div className="pt-4 pb-2 pl-[30px] pr-5">
        {currentTab !== 3 && (
          <FriendSearch value={searchString} onChange={handleSearchChange} />
        )}
        {getContent(currentTab)}
      </div>
    </>
  );
};

export default FriendsPage;

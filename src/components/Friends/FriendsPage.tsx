import { useState } from "react";
import FriendsList from "./FriendsList";
import FriendsTopbar from "./FriendsTopbar";
import AddFriendPage from "./AddFriendPage";

const FriendsPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  
  const handleTabChange = (tabId: number) => {
    setCurrentTab(tabId)
  }

  const content = currentTab == 2 ? <AddFriendPage /> : <FriendsList />

  return (
    <>
      <FriendsTopbar currentTab={currentTab} onTabChange={handleTabChange} />
      {content}
    </>
  );
};

export default FriendsPage;

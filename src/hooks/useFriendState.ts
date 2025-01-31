import {
  useGetFriendsQuery,
  useIgnoreFriendRequestMutation,
  useSendFriendRequestMutation,
  useUnFriendMutation,
} from "api";
import { useToastContext } from "context";
import { User } from "model";

export default function useFriendState() {
  const { showToast } = useToastContext();
  const { data: friends, isLoading: isLoadingFriends } = useGetFriendsQuery();
  const [unfriend] = useUnFriendMutation();
  const [ignoreFriend] = useIgnoreFriendRequestMutation();
  const [sendFriendRequestToUser] = useSendFriendRequestMutation();

  function filterFriendUsers(searchString: string, userList: User[]) {
    if (searchString !== "") {
      return userList.filter(
        (friendUser) =>
          friendUser.displayName.includes(searchString) ||
          friendUser.username.includes(searchString)
      );
    }
    return userList;
  }

  function sendFriendRequest(username: string) {
    if (username !== "") {
      sendFriendRequestToUser(username)
        .unwrap()
        .catch((e) => {
          if ("status" in e && e.status >= 400) {
            showToast(e.data.message);
          }
        });
    }
  }

  function removeFriend(friendId: string) {
    unfriend(friendId)
      .unwrap()
      .catch((e) => {
        if ("status" in e && e.status >= 400) {
          showToast(e.data.message);
        }
      });
  }

  function ignoreFriendRequest(friendId: string) {
    ignoreFriend(friendId)
      .unwrap()
      .catch((e) => {
        if ("status" in e && e.status >= 400) {
          showToast(e.data.message);
        }
      });
  }

  function unFriendUser(friendId: string) {
    unfriend(friendId)
      .unwrap()
      .catch((e) => {
        if ("status" in e && e.status >= 400) {
          showToast(e.data.message);
        }
      });
  }

  return {
    friends,
    isLoadingFriends,
    filterFriendUsers,
    removeFriend,
    unFriendUser,
    sendFriendRequest,
    ignoreFriendRequest,
  };
}

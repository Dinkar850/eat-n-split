import { useState } from "react";
import { Logo } from "./Logo";
import { Friends } from "./Friends";
import { FormSplitBill } from "./FormSplitBill";

export default function App() {
  const [friends, setFriends] = useState([]);
  const [curOpen, setCurOpen] = useState(null);
  let activeFriend;
  if (curOpen) {
    activeFriend = friends.at(
      friends.findIndex((friend) => friend.id === curOpen)
    );
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }
  function handleUpdateBalance(changedBalance) {
    const friendsArray = friends.filter(
      (friend) => friend.id !== activeFriend.id
    );
    setFriends(() => [
      {
        ...activeFriend,
        balance: activeFriend.balance + changedBalance,
      },
      ...friendsArray,
    ]);
  }
  function handleToggleFormSplitBill(id = null) {
    setCurOpen((cid) => (cid === id || !id ? null : id));
  }

  function handleRemoveFriend(id) {
    if (activeFriend && activeFriend.id === id) alert("Deselect first");
    else setFriends((friends) => friends.filter((friend) => friend.id !== id));
  }
  return (
    <>
      <Logo />
      <div className="app">
        <Friends
          onAddFriend={handleAddFriend}
          friends={friends}
          onToggleFormSplitBill={handleToggleFormSplitBill}
          onRemoveFriend={handleRemoveFriend}
          activeFriendId={curOpen}
        />
        {curOpen && (
          <FormSplitBill
            friend={activeFriend}
            onToggleFormSplitBill={handleToggleFormSplitBill}
            onUpdateBalance={handleUpdateBalance}
            key={activeFriend.id}
          />
        )}
      </div>
    </>
  );
}

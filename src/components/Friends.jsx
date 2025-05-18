import { useState } from "react";
import { Friend } from "./Friend";
import { FormAddFriend } from "./FormAddFriend";

export function Friends({
  onAddFriend,
  friends,
  onToggleFormSplitBill,
  onRemoveFriend,
  activeFriendId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function handleToggleFormAddFriend() {
    setIsOpen((is) => !is);
  }
  return (
    <div className="sidebar">
      <ul>
        {friends.map((friendObj) => (
          <Friend
            friendObj={friendObj}
            key={friendObj.id}
            onToggleFormSplitBill={onToggleFormSplitBill}
            onRemoveFriend={onRemoveFriend}
            activeFriendId={activeFriendId}
          />
        ))}
      </ul>
      {isOpen && (
        <FormAddFriend
          onAddFriend={onAddFriend}
          onToggleFormAddFriend={handleToggleFormAddFriend}
        />
      )}
      <button className="button" onClick={handleToggleFormAddFriend}>
        {isOpen ? "Close" : "Add Friend"}
      </button>
    </div>
  );
}

export function Friend({
  friendObj,
  onToggleFormSplitBill,
  onRemoveFriend,
  activeFriendId,
}) {
  return (
    <li>
      <button
        className="icon"
        onClick={() => onRemoveFriend(friendObj.id)}
        type="button"
      >
        &times;
      </button>
      <img src={friendObj.image} alt={friendObj.name}></img>
      <h3>{friendObj.name}</h3>
      {friendObj.balance > 0 && (
        <p className="green">
          {friendObj.name} owes you Rs.{friendObj.balance}
        </p>
      )}
      {friendObj.balance < 0 && (
        <p className="red">
          You owe {friendObj.name} Rs.{Math.abs(friendObj.balance)}
        </p>
      )}
      {friendObj.balance === 0 && <p>You and {friendObj.name} are even</p>}
      <button
        className="button"
        onClick={() => onToggleFormSplitBill(friendObj.id)}
      >
        {activeFriendId === friendObj.id ? "Close" : "Select"}
      </button>
    </li>
  );
}

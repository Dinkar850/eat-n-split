import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

/*
Components
- Friends with Friend 
- FormAddFriend
- FormExpense
*/

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [curOpen, setCurOpen] = useState(null);
  let activeFriend;
  console.log(friends);
  if (curOpen) {
    activeFriend = friends.at(
      friends.findIndex((friend) => friend.id === curOpen)
    );
  }
  console.log(activeFriend);
  // console.log(curOpen, activeFriend);
  function handleAddFriend(friend) {
    console.log("inside handler");
    setFriends((friends) => [...friends, friend]);
  }
  function handleUpdateBalance(changedBalance) {
    const friendsArray = friends.filter(
      (friend) => friend.id !== activeFriend.id
    );
    setFriends(() => [
      ...friendsArray,
      {
        ...activeFriend,
        balance: activeFriend.balance + changedBalance,
      },
    ]);
  }
  function handleToggleFormSplitBill(id = null) {
    setCurOpen((cid) => (cid === id || !id ? null : id));
  }

  return (
    <div className="app">
      <Friends
        onAddFriend={handleAddFriend}
        friends={friends}
        onToggleFormSplitBill={handleToggleFormSplitBill}
      />
      {curOpen && (
        <FormSplitBill
          friend={activeFriend}
          onToggleFormSplitBill={handleToggleFormSplitBill}
          onUpdateBalance={handleUpdateBalance}
        />
      )}
    </div>
  );
}

function Friends({ onAddFriend, friends, onToggleFormSplitBill }) {
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

function FormSplitBill({ friend, onToggleFormSplitBill, onUpdateBalance }) {
  const [bill, setBill] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [payer, setPayer] = useState("you");
  const friendsExpense = bill - yourExpense;
  const changedBalance = payer === "you" ? friendsExpense : -yourExpense;
  function handleSubmitFormSplitBill(e) {
    e.preventDefault();
    onUpdateBalance(changedBalance);
    setBill(0);
    setYourExpense(0);
    setPayer("you");
    onToggleFormSplitBill(null);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmitFormSplitBill}>
      <button className="icon" onClick={() => onToggleFormSplitBill(null)}>
        &times;
      </button>
      <h2>Split a bill with {friend.name}</h2>
      <label>💰 Bill Value </label>
      <input
        type="number"
        value={bill || ""}
        placeholder="0"
        onChange={(e) => {
          let val = +e.target.value;
          if (val >= yourExpense) setBill(val);
        }}
      ></input>
      <label>🕴️ Your Expense </label>
      <input
        type="number"
        value={yourExpense || ""}
        placeholder="0"
        onChange={(e) => {
          let val = +e.target.value;
          if (val >= 0 && val <= bill) setYourExpense(val);
        }}
      ></input>
      <label>🧑‍🤝‍🧑 {friend.name}'s Expense </label>
      <input type="text" value={friendsExpense} disabled></input>
      <label>🤑 Who's paying? </label>
      <select value={payer} onChange={(e) => setPayer(e.target.value)}>
        <option value="you">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <button className="button">Split Bill</button>
    </form>
  );
}

function Friend({ friendObj, onToggleFormSplitBill }) {
  return (
    <li>
      <img src={friendObj.image} alt={friendObj.name}></img>
      <h3>{friendObj.name}</h3>
      {friendObj.balance > 0 && (
        <p className="green">
          {friendObj.name} owes you Rs.{friendObj.balance}
        </p>
      )}
      {friendObj.balance < 0 && (
        <p className="red">
          You owe {friendObj.name} Rs.{friendObj.balance}
        </p>
      )}
      {friendObj.balance === 0 && <p>You and {friendObj.name} are even</p>}
      <button
        className="button"
        onClick={() => onToggleFormSplitBill(friendObj.id)}
      >
        Select
      </button>
    </li>
  );
}

function FormAddFriend({ onAddFriend, onToggleFormAddFriend }) {
  const id = Date.now();
  const [name, setName] = useState("");
  const [image, setImage] = useState(`https://i.pravatar.cc/48?`);

  function handleSubmitForm(e) {
    e.preventDefault();
    if (!name.length) return;
    const obj = { id, name, image, balance: 0 };
    onAddFriend(obj);
    onToggleFormAddFriend();
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmitForm}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>🖼️ Image</label>
      <input
        type="text"
        value={image + `u=${id}`}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <button className="button">Add</button>
    </form>
  );
}

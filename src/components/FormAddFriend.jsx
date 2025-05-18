import { useState } from "react";
export function FormAddFriend({ onAddFriend, onToggleFormAddFriend }) {
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

import { useState } from "react";

export function FormSplitBill({
  friend,
  onToggleFormSplitBill,
  onUpdateBalance,
}) {
  const [bill, setBill] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [payer, setPayer] = useState("you");
  const friendsExpense = bill - yourExpense;
  const changedBalance = payer === "you" ? friendsExpense : -yourExpense;
  function handleSubmitFormSplitBill(e) {
    e.preventDefault();
    setBill(0);
    setYourExpense(0);
    setPayer("you");
    onUpdateBalance(changedBalance);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmitFormSplitBill}>
      <button
        className="icon"
        onClick={() => onToggleFormSplitBill(null)}
        type="button"
      >
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
      <button className="button" type="submit">
        Split Bill
      </button>
    </form>
  );
}

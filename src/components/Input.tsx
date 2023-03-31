import React, { useState, useEffect } from "react";
import { InputPropsType, MessagesType } from "../utils/types";
import { api_url } from "../utils/url";

const Input = ({
  callData,
  fromMessageForEdit,
  setFromMessageForEdit,
  msg,
  setMsg,
}: InputPropsType) => {
  const [editId, setEditId] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (fromMessageForEdit.hasOwnProperty("id")) {
      setEditId(fromMessageForEdit.id.toString());
      setMsg({ from: fromMessageForEdit.from, text: fromMessageForEdit.text });
    }
  }, [fromMessageForEdit]);

  const handlePostSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let url = api_url;
      let method = "POST";
      if (fromMessageForEdit.hasOwnProperty("id")) {
        url += `${editId}`;
        method = "PUT";
      }
      const res = await fetch(api_url!, {
        method,
        body: JSON.stringify(msg),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) return setError(data);
      reset();
    } catch (err) {
      console.error(err);
    }
  };
  const reset = () => {
    clearInputs();
    callData();
    setError("");
    setFromMessageForEdit({} as MessagesType);
  };

  const clearInputs = () => {
    setMsg((prev) => ({ ...prev, from: "", text: "" }));
  };

  return (
    <div className="input-container">
      <form onSubmit={handlePostSubmit}>
        {error && <div className="input-error">{error}</div>}
        <input
          type="text"
          name="from"
          placeholder="Your Name"
          value={msg.from}
          onChange={(e) =>
            setMsg((prev) => ({ ...prev, from: e.target.value }))
          }
        />
        <br />
        <input
          type="text"
          name="text"
          placeholder="The message..."
          value={msg.text}
          onChange={(e) =>
            setMsg((prev) => ({ ...prev, text: e.target.value }))
          }
        />
        <br />
        <button>
          {fromMessageForEdit.hasOwnProperty("id") ? "Update" : "Send"}
        </button>
        <button type="button" onClick={clearInputs}>
          Clear
        </button>
        {fromMessageForEdit.hasOwnProperty("id") && (
          <button type="button" onClick={reset}>
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
};

export default Input;

import React from "react";
import { MessagesPropsType } from "../utils/types";
import { api_url } from "../utils/url";

const Messages = ({
  messages,
  callData,
  handleEdit,
  handleCancelEditMode,
}: MessagesPropsType) => {
  const handleDelete = async (id: string) => {
    await fetch(`${api_url}/${id}`, {
      method: "DELETE",
    });
    callData();
    handleCancelEditMode();
  };

  return (
    <div className="messages-container">
      {messages.map(({ id, from, text, timeSent }) => (
        <div key={id} className="message-container">
          <div className="message-title">
            <span>{from}:</span>
            <div className="message-btns">
              <button
                className="message-btn edit-btn"
                onClick={() => handleEdit(id, from, text)}
              >
                Edit
              </button>
              <button
                className="message-btn close-btn"
                onClick={() => handleDelete(id)}
              >
                X
              </button>
            </div>
          </div>
          <div className="message-text">{text}</div>
          <div className="message-info">
            {timeSent} #{id}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Messages;

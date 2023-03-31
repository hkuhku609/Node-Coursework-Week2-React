import React, { useState, useEffect, useCallback } from "react";
import Messages from "./components/Messages";
import Input from "./components/Input";
import Title from "./components/Title";
import DisplayStyle from "./components/DisplayStyle";
import CountDown from "./components/CountDown";
import Loading from "./components/Loading";
import "./App.css";
import { MessagesType } from "./utils/types";
import { api_url } from "./utils/url";

function App() {
  const [msg, setMsg] = useState<Omit<MessagesType, "id">>({
    from: "",
    text: "",
  });

  const [messages, setMessages] = useState<MessagesType[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<MessagesType[]>([]);
  const [state, setState] = useState({ isLoading: true, isError: false });

  const [fromMessageComponent, setFromMessageComponent] =
    useState<MessagesType>({} as MessagesType);
  const [display, setDisplay] = useState("latest");
  const fetchedData = useCallback(async () => {
    try {
      const res = await fetch(`${api_url}/${display}`);
      if (!res.ok) throw Error("Did not receive expected data");
      const data = await res.json();
      setState((prev) => ({ ...prev, isError: false }));
      setMessages(data);
      setFilteredMessages(data);
    } catch (err: any) {
      setState((prev) => ({ ...prev, isError: err.message }));
      console.error(err);
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [display]);
  useEffect(() => {
    fetchedData();
  }, [fetchedData, setMsg]);

  const handleEdit = (id: string, from: string, text: string) => {
    setFromMessageComponent({ id, from, text });
  };

  const searchFromApp = (word: string) => {
    if (!word.trim()) return setFilteredMessages(messages);
    const filtered = messages.filter(
      ({ from, text }) =>
        from.toLowerCase().includes(word) || text.toLowerCase().includes(word)
    );
    setFilteredMessages(filtered);
  };

  const changeDisplay = (radioValue: string) => {
    if (radioValue === "all") {
      setDisplay("");
    } else {
      setDisplay(radioValue);
    }
  };

  const handleCancelEditMode = () => {
    setMsg((prev) => ({ ...prev, from: "", text: "" }));
    setFromMessageComponent({} as MessagesType);
  };

  return (
    <div className="App">
      <Title />
      {state.isError && (
        <div className="messages-container">{state.isError}</div>
      )}
      {state.isLoading && <Loading />}
      {!state.isLoading && !state.isError && (
        <Messages
          messages={filteredMessages}
          callData={fetchedData}
          handleEdit={handleEdit}
          handleCancelEditMode={handleCancelEditMode}
        />
      )}
      <CountDown callData={fetchedData} />
      <DisplayStyle
        searchFromApp={searchFromApp}
        changeDisplay={changeDisplay}
      />
      <Input
        callData={fetchedData}
        fromMessageForEdit={fromMessageComponent}
        setFromMessageForEdit={setFromMessageComponent}
        msg={msg}
        setMsg={setMsg}
        handleCancelEditMode={handleCancelEditMode}
      />
    </div>
  );
}

export default App;

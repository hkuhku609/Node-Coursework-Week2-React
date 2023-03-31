export type MessagesType = {
  id: string;
  from: string;
  text: string;
  timeSent?: string;
};
export type CountDownPropsType = {
  callData: () => Promise<void>;
};
export type DisplayStylePropsType = {
  searchFromApp: (word: string) => void;
  changeDisplay: (radioValue: string) => void;
};
export type MessagesPropsType = {
  messages: MessagesType[];
  callData: () => Promise<void>;
  handleEdit: (id: string, from: string, text: string) => void;
  handleCancelEditMode: () => void;
};
export type InputPropsType = {
  callData: () => Promise<void>;
  fromMessageForEdit: MessagesType;
  setFromMessageForEdit: React.Dispatch<React.SetStateAction<MessagesType>>;
  msg: Omit<MessagesType, "id">;
  setMsg: React.Dispatch<React.SetStateAction<Omit<MessagesType, "id">>>;
  handleCancelEditMode: () => void;
};

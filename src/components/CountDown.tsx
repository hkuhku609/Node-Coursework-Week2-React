import React, { useState, useEffect } from "react";
import { CountDownPropsType } from "../utils/types";

let interval: NodeJS.Timeout;
const CountDown = ({ callData }: CountDownPropsType) => {
  const timer = 30;
  const [isOff, setIsOff] = useState(true);
  const [sec, setSec] = useState(timer);

  useEffect(() => {
    if (!isOff) {
      interval = setInterval(() => {
        setSec((prev) => {
          if (prev <= 0) {
            callData();
            return timer;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOff, callData]);

  const check = () => {
    setIsOff((prev) => !prev);
    if (!isOff) {
      clearInterval(interval);
      setSec(timer);
    }
  };
  return (
    <div className="radio-container" onChange={check}>
      <span>Every 30 seconds update:</span>
      <input type="radio" id="on" name="countdown" value="on" />
      <label htmlFor="on">On</label>
      <input
        type="radio"
        id="off"
        name="countdown"
        value="off"
        defaultChecked
      />
      <label htmlFor="off">Off</label>
      {!isOff && sec}
    </div>
  );
};

export default CountDown;

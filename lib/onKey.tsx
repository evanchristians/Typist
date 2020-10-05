import { useState, useEffect } from "react";

export const onKey = (callback) => {
  const [keyPressed, setKeyPressed] = useState();
  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key.length === 1 || key === "Backspace") {
        setKeyPressed(key);
        callback && callback(key);
      }
    };
    const upHandler = () => {
      setKeyPressed(undefined);
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });
  return keyPressed;
};

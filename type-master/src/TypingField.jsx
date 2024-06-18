import { useState, useEffect, useRef } from "react";
import text from "./Text.jsx";
import "./TypingField.css";

export default function TypingField() {
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isInitialKeyPressed, setIsInitialKeyPressed] = useState(false);
  const inputRef = useRef(null);

  const initializeRandomText = (text) => {
    const randomText = Math.floor(Math.random() * text.length);
    setCurrentText(text[randomText]);
  };

  useEffect(() => {
    initializeRandomText(text);
  }, []);

  // Makes sure the first pressed key is not used
  useEffect(() => {
    const handleInitialKeyPress = (e) => {
      if (!isInitialKeyPressed) {
        setIsInitialKeyPressed(true);
        inputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleInitialKeyPress);

    return () => {
      window.removeEventListener("keydown", handleInitialKeyPress);
    };
  }, [isInitialKeyPressed]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="typing-field">
      <div className="text-container">
        <div className="current-text">
          {currentText.split("").map((char, index) => (
            <span
              key={index}
              className={
                index < userInput.length
                  ? userInput[index] === char
                    ? "correct-char"
                    : "incorrect-char"
                  : ""
              }
            >
              {char}
            </span>
          ))}
        </div>
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          ref={inputRef}
          className="hidden-input"
          autoComplete="off"
        />
      </div>
    </div>
  );
}

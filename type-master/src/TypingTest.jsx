import { useState, useEffect, useRef} from "react";
import text from "./Text.jsx";
import "./TypingTest.css";

function TypingTest({handleFinishTyping}) {
  const [currentText, setCurrentText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [errors, setErrorCount] = useState(0);
  const [timer, setTimer] = useState(30);
  const [timerRunning, setTimerRunning] = useState(false);
  const inputRef = useRef(null);

  const initializeRandomTest = () => {
    const randomIndex = Math.floor(Math.random() * text.length);
    setCurrentText(text[randomIndex])
  }

  useEffect(() => {
    initializeRandomTest();
    inputRef.current.focus();
  }, []);

  //Starts the timer
  const handleKeyDown = (event) => {
    if (!timerRunning && event.target.onKeyUp) {
      setTimerRunning(true);
      inputRef.current.focus();
    }
  }

  //Handles user input and checks if the user finished
  const handleInputChange = (event) => {
    const typedText = event.target.value;
    setUserInput(typedText);

    if (typedText.length === currentText.length) {
        setTimerRunning(false); // Stop the timer
        showResult();
    }
  }

  //Handles the result information
  const showResult = () => {
    alert("Typing finished. Blur the window and display result + start again button");
    handleFinishTyping();
    resetState();
  }

  //Resets all state variables
  const resetState = () => {
    setUserInput("");
    setErrorCount(0);
    setCurrentText(initializeRandomTest);
    setTimer(30);
  }

  return (
    <div className="typing-test" onKeyDown={handleKeyDown}>
      <div className="text-container" onClick={() => inputRef.current.focus()}>
        <div className="current-text">
          {currentText.split('').map((char, index) => (
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
        {/* Hidden input field */}
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

export default TypingTest;

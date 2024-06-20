import { useState, useEffect, useRef } from "react";
import text from "./Text.jsx";
import Header from "./Header";
import "./TypingField.css";

export default function TypingField() {
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isInitialKeyPressed, setIsInitialKeyPressed] = useState(false);
  const [timer, setTimer] = useState(30);
  const [errors, setErrors] = useState(0);
  const [points, setPoints] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);
  const intervalRef = useRef(null);

  const initializeRandomText = () => {
    const randomIndex = Math.floor(Math.random() * text.length);
    setCurrentText(text[randomIndex]);
  };

  useEffect(() => {
    initializeRandomText();
  }, []);

  useEffect(() => {
    const handleInitialKeyPress = (e) => {
      if (!isInitialKeyPressed) {
        setIsInitialKeyPressed(true);
        inputRef.current.focus();
        startTimer();
      }
    };

    window.addEventListener("keydown", handleInitialKeyPress);

    return () => {
      window.removeEventListener("keydown", handleInitialKeyPress);
      clearInterval(intervalRef.current);
    };
  }, [isInitialKeyPressed]);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalRef.current);
          setShowModal(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleInputChange = (e) => {
    const typedText = e.target.value;
    setUserInput(typedText);

    const errorCount = calculateErrors(typedText, currentText);
    setErrors(errorCount);

    if (typedText.length === currentText.length) {
      clearInterval(intervalRef.current);
      setShowModal(true);
    }
  };

  const calculateErrors = (typedText, originalText) => {
    let errorCount = 0;
    let pointsCount = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] !== originalText[i]) {
        errorCount++;
        pointsCount -= 5;
      } else {
        pointsCount += 3;
      }
    }
    setPoints(pointsCount);
    return errorCount;
  };

  const closeModal = () => {
    setShowModal(false);
    setIsInitialKeyPressed(false);
    setTimer(30);
    setUserInput("");
    initializeRandomText();
    setErrors(0);
    setPoints(0);
  };

  return (
    <div className="typing-field">
      <div className="icons-header">
        <Header errorCount={errors} timer={timer} points={points} />
      </div>
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
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Time's up!</h2>
            <p>Your time is up. Here's your result:</p>
            <p>Errors: {errors}</p>
            <p>Points: {points}</p>
            <button onClick={closeModal}>Restart</button>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import text from "./Text.jsx";
import Header from "./Header";
import ResultModal from "./ResultModal.jsx";
import "./TypingField.css";

export default function TypingField({ isStarted, setIsStarted }) {
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
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
    if (isStarted) {
      startTimer();
      inputRef.current.focus();
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isStarted]);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        const newTimer = prevTimer - 1;
        if (newTimer <= 0) {
          clearInterval(intervalRef.current);
          setShowModal(true);
          return 0;
        }
        return newTimer;
      });
    }, 1000);
  };

  const handleInputChange = (e) => {
    if (showModal) return;
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
    setIsStarted(false);
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
          disabled={showModal}
        />
      </div>
      {showModal && (
        <ResultModal errors={errors} points={points} onClose={closeModal} />
      )}
    </div>
  );
}

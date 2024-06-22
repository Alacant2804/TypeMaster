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
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [totalWords, setTotalWords] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);
  const intervalRef = useRef(null);

  const calculateTotalWords = (initialText) => {
    if (!initialText || initialText.trim().length === 0) {
      return 0;
    }

    const wordsTotal = initialText.trim().split(/\s+/).length;
    setTotalWords(wordsTotal);
  };

  const calculateWPM = (userText) => {
    if(!userInput || userInput.trim().length === 0) {
      setWpm(0);
      return 0;
    }
    const userWords = userText.trim().split(/\s+/).length;
    const WPM = userWords / 0.5;
    setWpm(WPM);
  }

  const initializeRandomText = () => {
    const randomIndex = Math.floor(Math.random() * text.length);
    setCurrentText(text[randomIndex]);
    calculateTotalWords(text[randomIndex]);
  };

  useEffect(() => {
    initializeRandomText();
    calculateTotalWords();
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
          calculateAccuracy();
          calculateWPM(userInput);
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
      calculateAccuracy();
      calculateWPM(userInput);
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

  const calculateAccuracy = () => {
    const correctCharacters = currentText
      .split("")
      .filter((char, index) => char === userInput[index]).length;
    const totalCharacters = currentText.length;
    const calculatedAccuracy = Math.floor((correctCharacters / totalCharacters) * 100);
    setAccuracy(calculatedAccuracy);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsStarted(false);
    setTimer(30);
    setUserInput("");
    initializeRandomText();
    setErrors(0);
    setPoints(0);
    setWpm(0);
    setAccuracy(100);
  };

  return (
    <div className="typing-field">
      <div className="icons-header">
        <Header
          errorCount={errors}
          timer={timer}
          points={points}
          totalWords={totalWords}
        />
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
        <ResultModal
          errors={errors}
          points={points}
          onClose={closeModal}
          WPM={wpm}
          accuracy={accuracy}
          words={totalWords}
        />
      )}
    </div>
  );
}

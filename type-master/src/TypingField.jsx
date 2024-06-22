import { useState, useEffect, useRef } from "react";
import text from "./Text.jsx";
import Header from "./Header";
import ResultModal from "./ResultModal.jsx";
import "./TypingField.css";

export default function TypingField({ isStarted, setIsStarted }) {
  const [currentText, setCurrentText] = useState("");
  const [userInput, setUserInput] = useState("");
  const userInputRef = useRef("");
  const [timer, setTimer] = useState(30);
  const [errors, setErrors] = useState(0);
  const [points, setPoints] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [totalWords, setTotalWords] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const calculateTotalWords = (initialText) => {
    if (!initialText || initialText.trim().length === 0) {
      return 0;
    }

    const wordsTotal = initialText.trim().split(/\s+/).length;
    setTotalWords(wordsTotal);
  };

  // Initialize the text and calculate total words
  const initializeRandomText = () => {
    const randomIndex = Math.floor(Math.random() * text.length);
    const randomText = text[randomIndex];
    setCurrentText(randomText);
    calculateTotalWords(randomText);
  };

  useEffect(() => {
    initializeRandomText();
  }, []);

  useEffect(() => {
    if (isStarted) {
      startTimeRef.current = Date.now(); // Record the start time
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
          calculateResults();
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
    userInputRef.current = typedText;
    console.log("userInput in handleInputChange: ", userInput);

    const errorCount = calculateErrors(typedText, currentText);
    setErrors(errorCount);

    if (typedText.length === currentText.length) {
      clearInterval(intervalRef.current);
      calculateResults();
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

  const calculateWPM = (userText) => {
    const userWords = userText.trim().split(/\s+/).length;
    console.log("CalculateWPM: userWords = ", userWords);
    const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;
    console.log("Elapsed Seconds: ", elapsedSeconds);
    const WPM = (userWords * 60) / elapsedSeconds;
    console.log("WPM :", WPM);
    return Math.round(WPM); // Round WPM to the nearest whole number
  };

  const calculateAccuracy = (userText, originalText) => {
    const correctCharacters = originalText.split("").filter((char, index) => char === userText[index]).length;
    const totalCharacters = originalText.length;

    if (totalCharacters === 0) {
      return 100; // If there are no characters to compare, assume 100% accuracy
    }
    return Math.floor((correctCharacters / totalCharacters) * 100);
  };

  const calculateResults = () => {
    console.log("Calculate Results: userInputRef = ", userInputRef.current);
    const finalWPM = calculateWPM(userInputRef.current);
    const finalAccuracy = calculateAccuracy(userInputRef.current, currentText);
    setWpm(finalWPM);
    setAccuracy(finalAccuracy);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsStarted(false);
    setTimer(30);
    setUserInput("");
    userInputRef.current = "";
    initializeRandomText();
    setErrors(0);
    setPoints(0);
    setWpm(0);
    setAccuracy(100);
    startTimeRef.current = null;
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

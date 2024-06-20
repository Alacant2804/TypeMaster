import { useState, useEffect } from "react";
import TypingField from "./TypingField";
import "./App.css";

function App() {
  const [isStarted, setIsStarted] = useState(false);

  // Listen for key press to start typing
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isStarted) {
        event.preventDefault(); // Prevent the first key from being passed to input
        setIsStarted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStarted]);

  return (
    <div className="text-container">
      {!isStarted && (
        <div className="overlay">
          <p>Please press any key to start</p>
        </div>
      )}
      <div className={`window-area ${isStarted ? "" : "blurred"}`}>
        <TypingField />
      </div>
    </div>
  );
}

export default App;

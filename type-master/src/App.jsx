import { useState, useEffect } from "react";
import TypingField from "./TypingField";
import "./App.css";

function App() {
  const [isStarted, setIsStarted] = useState(false);

  // Listen for key press to start typing
  useEffect(() => {
    const handleKeyDown = () => {
      if (!isStarted) {
        setIsStarted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isStarted]);

  return (
    <div className={`window-area ${isStarted ? "" : "blurred"}`}>
      <TypingField />
    </div>
  );
}

export default App;

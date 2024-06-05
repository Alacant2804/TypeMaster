import { useState } from "react";
import "./TypingTest.css";

function TypingTest() {
  const [inputTest, setInputTest] = useContext("");
  const [time, setTime] = useContext(null);

  return (
    <div>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Start typing here..."
        rows={10}
        cols={50}
      />
      <div>Typing Speed: {startTime ? calculateWPM() : 0} WPM</div>
    </div>
  );
}

export default TypingTest;

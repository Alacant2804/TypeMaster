import {useState} from 'react';
import TypingTest from './TypingTest';
import "./App.css";

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const handleStartTyping = () => {
    setIsStarted(true);
  };

  const handleFinishTyping = () => {
    setIsStarted(false);
  };

  return (
    <div className='window-area'>
      {!isStarted ? (
        <div className="blurry-text" onKeyDown={handleStartTyping} tabIndex={0} role="button">
          <p>Please press any key to start</p>
        </div>
      ) : (
        <TypingTest className="typing area" handleFinishTyping={handleFinishTyping} />
      )}
    </div>
  );
}

export default App;

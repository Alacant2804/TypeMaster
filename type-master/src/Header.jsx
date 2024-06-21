import "./Header.css";
import skullIcon from "./assets/skull.png";
import starIcon from "./assets/star.png";
import timerIcon from "./assets/timer.png";
import wordsIcon from "./assets/words.png";

export default function Header({ errorCount, timer, points, totalWords }) {
  return (
    <div className="container">
      <div className="timer">
        <img src={timerIcon} alt="timer icon" className="icon timer-icon" />
        <p>
          <span className="icon-name">Timer: {timer}</span>
        </p>
      </div>
      <div className="skull">
        <img src={skullIcon} alt="skull icon" className="icon skull-icon" />
        <p>
          <span className="icon-name">Errors: {errorCount}</span>
        </p>
      </div>
      <div className="points">
        <img src={starIcon} alt="points icon" className="icon points-icon" />
        <p>
          <span className="icon-name">Points: {points}</span>
        </p>
      </div>
      <div className="words">
        <img src={wordsIcon} alt="words icon" className="icon words-icon" />
        <p>
          <span className="icon-name">Words: {totalWords}</span>
        </p>
      </div>
    </div>
  );
}

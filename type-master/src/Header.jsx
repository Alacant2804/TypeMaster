import "./Header.css";
import skullIcon from "./assets/skull.png";
import starIcon from "./assets/star.png";
import timerIcon from "./assets/timer.png";

export default function Header({ errorCount, timer, points }) {
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
    </div>
  );
}

import "./Header.css";
import skullIcon from "./assets/skull.png";
import starIcon from "./assets/star.png";
import timerIcon from "./assets/timer.png";

export default function Header({ errorCount, timer, points }) {
  return (
    <div className="container">
      <div className="timer">
        <img src={timerIcon} alt="timer icon" className="timer-icon" />
        <p>Timer: {timer}</p>
      </div>
      <div className="skull">
        <img src={skullIcon} alt="skull icon" className="skull-icon" />
        <p>Errors: {errorCount}</p>
      </div>
      <div className="points">
        <img src={starIcon} alt="points icon" className="points-icon" />
        <p>Points: {points}</p>
      </div>
    </div>
  );
}

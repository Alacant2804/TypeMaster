import "./ResultModal.css";

export default function ResultModal({
  errors,
  points,
  onClose,
  WPM,
  accuracy,
  totalWords,
}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Time's up! Here's your result:</h2>
        <p>Errors: {errors}</p>
        <p>Points: {points}</p>
        <p>Total Words: {totalWords}</p>
        <p>Words per Minute: {WPM}</p>
        <p>Accuracy: {accuracy}%</p>
        <button onClick={onClose}>Restart</button>
      </div>
    </div>
  );
}

import "./CircularButton.css";

interface Props {
  icon: string;
  count?: number;
  onClick: () => void;
  active?: boolean;
  extraClass?: string;
}

function CircularButton({ icon, count, onClick, active = false, extraClass = "" }: Props) {
  return (
    <div className="circular-button">
      <button
        onClick={onClick}
        className={[active ? "active" : "", extraClass].filter(Boolean).join(" ")}
        aria-label="action"
      >
        <img src={icon} alt="icon" />
      </button>
      {count !== undefined && <span>{count}</span>}
    </div>
  );
}

export default CircularButton;
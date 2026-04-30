import "./CircularButton.css";

interface Props {
  icon: string;
  count?: number;
  onClick: () => void;
  active?: boolean;
}

function CircularButton({ icon, count, onClick, active = false }: Props) {
  return (
    <div className="circular-button">
      <button
        onClick={onClick}
        className={active ? "active" : ""}
        aria-label="action"
      >
        <img src={icon} alt="button-icon" />
      </button>
      {count !== undefined && <span>{count}</span>}
    </div>
  );
}

export default CircularButton;

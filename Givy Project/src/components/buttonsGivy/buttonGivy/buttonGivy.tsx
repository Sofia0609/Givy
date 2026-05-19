import "./buttonGivy.css";

interface ButtonGivyProps {
  label: string;
  onClick?: () => void;
}

function ButtonGivy({ label, onClick }: ButtonGivyProps) {
  return (
    <button className="buttonGivy" onClick={onClick}>
      {label}
    </button>
  );
}

export default ButtonGivy;
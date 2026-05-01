import "./Tag.css";

interface Props {
  label: string;
}

function Tag({ label }: Props) {
  return <button className="tag">{label}</button>;
}

export default Tag;
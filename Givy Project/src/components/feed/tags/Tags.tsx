
import "./tags.css";
import Tag from "../tag/Tag";

interface Props {
  items: string[];
}

function Tags({ items }: Props) {
  return (
    <div className="tags">
      {items.map((item, i) => (
        <Tag key={i} label={item} />
      ))}
    </div>
  );
}

export default Tags;

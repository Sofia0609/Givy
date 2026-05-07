import { useState } from "react";
import "./InputComments.css";

interface Props {
  onSubmit: (text: string) => void;
}

function InputComment({ onSubmit }: Props) {
  const [text, setText] = useState("");

  return (
    <div className="input-comment">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un comentario..."
      />
      <button
        onClick={() => {
          if (text.trim()) {
            onSubmit(text);
            setText("");
          }
        }}
      >
        Enviar
      </button>
    </div>
  );
}

export default InputComment;

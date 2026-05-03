import "./inputGivy.css";

interface InputGivyProps {
  label: string;
  type: string;
  value?: string;
  placeholder?: string;
}

function InputGivy({ label, type, value, placeholder}: InputGivyProps) {

    return(
        <div className="login-field">
            <label>{label}</label>
            <input  type={type} value={value} placeholder={placeholder} />
        </div>
    )
}

export default InputGivy;
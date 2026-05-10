import "./inputGivy.css";

interface InputGivyProps {
  label: string;
  type: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: any) => void;
}

function InputGivy({ label, type, value, placeholder, onChange}: InputGivyProps) {

    return(
        <div className="login-field">
            <label>{label}</label>
            <input onChange={onChange}  type={type} value={value} placeholder={placeholder} />
        </div>
    )
}

export default InputGivy;
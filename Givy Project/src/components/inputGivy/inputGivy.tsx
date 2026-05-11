import "./inputGivy.css";

interface InputGivyProps {
  label: string;
  type: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  big?: boolean  
}

function InputGivy({ label, type, value, placeholder, onChange, big }: InputGivyProps) {

    return(
        <div className="login-field">
            <label>{label}</label>
            {big ? (
                <textarea
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className="input-big"
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            )}
        </div>
    )
}

export default InputGivy
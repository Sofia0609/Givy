import './dropdown.css'

interface DropdownProps {
    label: string
    options: { id: string, name: string }[] 
    value?: string
    onChange?: (value: string) => void
}

function Dropdown({ label, options, value, onChange }: DropdownProps) {
    return (
        <div className='dropdown-field'>
            <label>{label}</label>
            <select
                value={value}
                onChange={e => onChange?.(e.target.value)}
            >
                <option value="">Select</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Dropdown
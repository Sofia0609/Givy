import './dropdownGivy.css'

interface DropdownGivyProps {
    label: string
    options: { id: string, name: string }[] 
    value?: string
    onChange?: (value: string) => void
}

function DropdownGivy({ label, options, value, onChange }: DropdownGivyProps) {
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

export default DropdownGivy
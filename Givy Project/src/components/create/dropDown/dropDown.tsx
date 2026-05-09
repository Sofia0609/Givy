import { useState } from 'react'
import './dropDown.css'

interface DropdownProps {
    label: string
    options: { id: string, name: string }[]
    value?: string
    onChange?: (value: string) => void
}

function Dropdown({ label, options, value, onChange }: DropdownProps) {
    
    const [isOpen, setIsOpen] = useState(false)
    const selectedOption = options.find(opt => opt.id === value)

    function handleSelect(optionId: string) {
        onChange?.(optionId)
        setIsOpen(false)  
    }

    return (
        <div className='dropdownField'>
            <label>{label}</label>
            
            <div
                className='dropdownTrigger'
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedOption?.name || 'Select'}</span>
                <span className='dropdownArrow'>▼</span>
            </div>

            {isOpen && (
                <div className='dropdownMenu'>
                    {options.map(option => (
                        <div
                            key={option.id}
                            className={`dropdownOption ${option.id === value ? 'active' : ''}`}
                            onClick={() => handleSelect(option.id)}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown
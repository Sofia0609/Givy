import { useState } from 'react'
import './SearchBar.css'
import searchicon from '../../../assets/search_icon.svg'

interface SearchBarProps {
    placeholder: string
    onChange: (value: string) => void
    onSearch: (value: string) => void  
}

function SearchBar({ placeholder, onChange, onSearch }: SearchBarProps) {
    const [value, setValue] = useState('')

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onSearch(value)
    }

    return (
        <div className="searchBar">
            <img src={searchicon} alt="" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => { setValue(e.target.value); onChange(e.target.value) }}
                onKeyDown={handleKey}
            />
        </div>
    )
}

export default SearchBar
import './SearchBar.css'
import searchicon from '../../../assets/search_icon.svg'

interface SearchBar {
    placeholder: string
    onChange: (value: string) => void
}

function SearchBar({ placeholder, onChange }: SearchBar) {
    return (
        <div className="searchBar">
            <img src={searchicon} alt="" />
            <input 
                type="text" 
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default SearchBar;
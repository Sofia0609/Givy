interface SearchBar {
    placeholder: string
    onChange: (value: string) => void
}

function SearchBar({ placeholder, onChange }: SearchBar) {
    return (
        <div className="searchBar">
            <img src="/icons/search.svg" alt="search" />
            <input 
                type="text" 
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default SearchBar;
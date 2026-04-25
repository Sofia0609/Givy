
import SearchBar from '../../components/search/searchBar/SearchBar'
import CategoryChip from '../../components/search/categoryChip/CategoryChip'
import HistoryItem from '../../components/search/historyItem/HistoryItem'
import RecommendedItem from '../../components/search/recommendedItem/RecommendedItem'


function Search() {
    return (
        <div className="searchScreen">
            <SearchBar placeholder="Search" onChange={() => {}} />

            <div className="categories">
                <CategoryChip label="Science" onClick={() => {}} />
                <CategoryChip label="Maths" onClick={() => {}} />
                <CategoryChip label="Design" onClick={() => {}} />
            </div>

            <div className="history">
                <HistoryItem text="How to play Piano" onDelete={() => {}} />
                <HistoryItem text="How to speak English like a Native" onDelete={() => {}} />
                <HistoryItem text="Singing Teniques" onDelete={() => {}} />
            </div>

            <h3>Recommended</h3>
            <RecommendedItem title="Avanced Math" onClick={() => {}} />
            <RecommendedItem title="How to speak Japanese" onClick={() => {}} />
            <RecommendedItem title="Tips for Singing" onClick={() => {}} />
            <RecommendedItem title="Play guitar" onClick={() => {}} />
        </div>
    )
}

export default Search
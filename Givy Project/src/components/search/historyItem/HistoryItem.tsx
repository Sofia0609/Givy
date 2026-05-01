import './HistoryItem.css'
import historyicon from '../../../assets/search_icon.svg'

interface HistoryItem {
    text: string
    onDelete: () => void
}

function HistoryItem({ text, onDelete }: HistoryItem) {
    return (
        <div className="historyItem">
                <img src={historyicon} alt="" />
            <span>{text}</span>
            <button onClick={onDelete}>✕</button>
        </div>
    )
}

export default HistoryItem;
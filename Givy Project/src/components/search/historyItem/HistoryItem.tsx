import './HistoryItem.css'
import historyicon from '../../../assets/Refresh cw.svg'

interface HistoryItemProps {
    text: string
    onDelete: () => void
    onClick: () => void   // ← nueva prop
}

function HistoryItem({ text, onDelete, onClick }: HistoryItemProps) {
    return (
        <div className="historyItem">
            <img src={historyicon} alt="" />
            <span onClick={onClick}>{text}</span>
            <button onClick={onDelete}>✕</button>
        </div>
    )
}

export default HistoryItem
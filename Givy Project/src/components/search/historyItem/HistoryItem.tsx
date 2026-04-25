interface HistoryItem {
    text: string
    onDelete: () => void
}

function HistoryItem({ text, onDelete }: HistoryItem) {
    return (
        <div className="historyItem">
            <img src="/icons/refresh.svg" alt="history" />
            <span>{text}</span>
            <button onClick={onDelete}>✕</button>
        </div>
    )
}

export default HistoryItem;
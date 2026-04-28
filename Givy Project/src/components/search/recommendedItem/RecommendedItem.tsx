import './RecommendedItem.css'

interface RecommendedItem {
    title: string
    onClick: () => void
}

function RecommendedItem({ title, onClick }: RecommendedItem) {
    return (
        <div className="recommendedItem" onClick={onClick}>
            <span className="dot">●</span>
            <span>{title}</span>
        </div>
    )
}

export default RecommendedItem;
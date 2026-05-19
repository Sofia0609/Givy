import './RecommendedItem.css'

interface RecommendedItemProps {
    title: string
    videoId: string
    onClick: () => void
}

function RecommendedItem({ title, onClick }: RecommendedItemProps) {
    return (
        <div className="recommendedItem" onClick={onClick} style={{ cursor: 'pointer' }}>
            <span className="dot">●</span>
            <span>{title}</span>
        </div>
    )
}

export default RecommendedItem;
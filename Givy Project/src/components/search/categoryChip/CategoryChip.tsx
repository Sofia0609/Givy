interface CategoryChip {
    label: string
    onClick: () => void
}

function CategoryChip({ label, onClick }: CategoryChip) {
    return (
        <button className="categoryChip" onClick={onClick}>
            {label}
        </button>
    )
}

export default CategoryChip;
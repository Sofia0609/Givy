import './TagsContainer.css'

interface TagsContainerProps {
    title: string
    tags: string[]
    variant: 'teaching' | 'learning'
}

function TagsContainer({ title, tags, variant }: TagsContainerProps) {
    return (
        <div className="tagsContainer">
            <p className="tagsTitle">{title}</p>
            <div className="tagsList">
                {tags.map((tag) => (
                    <span key={tag} className={`tag tag--${variant}`}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default TagsContainer
import { useState } from 'react'
import './TagsContainer.css'

interface TagsContainerProps {
    title: string
    tags: string[]
    variant: 'teaching' | 'learning'
    options: { id: string, name: string }[]
    onAddTag?: (tag: string) => void
    onRemoveTag?: (tag: string) => void
}

function TagsContainer({ title, tags, variant, options, onAddTag, onRemoveTag }: TagsContainerProps) {
    const [showPopup, setShowPopup] = useState(false)
    const [selectedOption, setSelectedOption] = useState('')
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    function handleAdd() {
        if (selectedOption) {
            const found = options.find(o => o.id === selectedOption)
            onAddTag?.(found?.name || selectedOption)
            setSelectedOption('')
            setShowPopup(false)
        }
    }

    function handleRemove() {
        if (selectedTag) {
            onRemoveTag?.(selectedTag)
            setSelectedTag(null)
        }
    }

    return (
        <div className="tagsContainer">
            <div className="tagsHeader">
                <p className="tagsTitle">{title}</p>
                {onAddTag && (
                    <button className="tagsAddBtn" onClick={() => setShowPopup(true)}>+</button>
                )}
            </div>

            <div className="tagsList">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className={`tag tag--${variant}`}
                        onClick={() => onRemoveTag && setSelectedTag(tag)}
                        style={{ cursor: onRemoveTag ? 'pointer' : 'default' }}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Popup para agregar tag */}
            {showPopup && (
                <div className="tagsPopupOverlay" onClick={() => setShowPopup(false)}>
                    <div className="tagsPopup" onClick={(e) => e.stopPropagation()}>
                        <p className="tagsPopupTitle">Add {title.toLowerCase()} skill</p>

                        <div className="tagsDropdownWrapper">
                            <div
                                className="tagsDropdownTrigger"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span>
                                    {options.find(o => o.id === selectedOption)?.name || 'Select a skill...'}
                                </span>
                                <span className="tagsDropdownArrow">▼</span>
                            </div>

                            {isDropdownOpen && (
                                <div className="tagsDropdownMenu">
                                    {options
                                        .filter(o => !tags.includes(o.name))
                                        .map(option => (
                                            <div
                                                key={option.id}
                                                className={`tagsDropdownOption ${option.id === selectedOption ? 'active' : ''}`}
                                                onClick={() => {
                                                    setSelectedOption(option.id)
                                                    setIsDropdownOpen(false)
                                                }}
                                            >
                                                {option.name}
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>

                        <div className="tagsPopupButtons">
                            <button className="tagsPopupCancel" onClick={() => {
                                setShowPopup(false)
                                setSelectedOption('')
                                setIsDropdownOpen(false)
                            }}>Cancel</button>
                            <button className="tagsPopupConfirm" onClick={handleAdd}>Add</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Popup para eliminar tag */}
            {selectedTag && (
                <div className="tagsPopupOverlay" onClick={() => setSelectedTag(null)}>
                    <div className="tagsPopup" onClick={(e) => e.stopPropagation()}>
                        <p className="tagsPopupTitle">Remove skill</p>
                        <p className="tagsPopupSubtitle">
                            Do you want to remove <strong>"{selectedTag}"</strong>?
                        </p>
                        <div className="tagsPopupButtons">
                            <button className="tagsPopupCancel" onClick={() => setSelectedTag(null)}>Cancel</button>
                            <button className="tagsPopupDelete" onClick={handleRemove}>Remove</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TagsContainer
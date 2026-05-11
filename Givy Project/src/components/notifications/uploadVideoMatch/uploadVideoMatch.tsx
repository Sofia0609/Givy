import BigButton from '../../bigButton/bigButton'
import UploadVideo from '../../create/uploadVideo/uploadVideo'
import './UploadVideoMatch.css'

interface UploadVideoMatchprops {
    tittle: string
    description: string
    icon: string
    onVideoSelect?: (file: File) => void
    disabled?: boolean
}

function UploadVideoMatch({ tittle, description, icon, onVideoSelect, disabled }: UploadVideoMatchprops) {

    return (
        <div className='uploadVideoMatchContainer'>
            <h2 className='tittleMatch'>{tittle}</h2>
            <UploadVideo
                icon={icon}
                onVideoSelect={disabled ? undefined : onVideoSelect}
            />
            <BigButton content='UPLOAD' />
            <p className='descriptionMatch'>{description}</p>
        </div>
    )
}

export default UploadVideoMatch;
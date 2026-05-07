import BigButton from '../../bigButton/bigButton'
import UploadVideo from '../../create/uploadVideo/uploadVideo'
import './UploadVideoMatch.css'

interface UploadVideoMatchprops{
    title: string
    description: string
    icon: string
}

function UploadVideoMatch({title, description, icon}:UploadVideoMatchprops){

    return(
        <>  
        <div className='uploadVideoMatchContainer'>
                <h2 className='tittleMatch'>  {title} </h2>
                <UploadVideo icon={icon} />
                <BigButton content='UPLOAD'/>
                <p className='descriptionMatch'>  {description} </p>
         </div>
        </>
    )
}

export default UploadVideoMatch;
import { useNavigate } from 'react-router'
import './uploadVideo.css'

interface UploadVideoprops{
    icon : string
}

function UploadVideo({icon}:UploadVideoprops){

    return(
        <>  
        <div className='uploadVideo'>
            <div className='border'>
                <img src={icon} alt="" />
            </div>
         </div>
        </>
    )
}

export default UploadVideo;
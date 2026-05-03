import { useNavigate } from 'react-router'
import './videoScreen.css'

interface VideoScreenprops{
    icon : string
}

function VideoScreen({icon}:VideoScreenprops){

    return(
        <>  
        <div className='VideoScreen'>
            <div>
                <img src={icon} alt="" />
            </div>
         </div>
        </>
    )
}

export default VideoScreen;
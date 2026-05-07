import './videoScreen.css'

interface VideoScreenprops{
    icon : string
}

function VideoScreen({icon}:VideoScreenprops){

    return(
        <>  
        <div className='VideoScreen'>
            <div className='video'>
                <img className='playIcon' src={icon} alt="" />
            </div>
         </div>
        </>
    )
}

export default VideoScreen;
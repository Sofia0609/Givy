import './mediumButton.css'

interface MediumButtonprops{
    content : string
    onClick?: () => void
}

function MediumButton({content, onClick}:MediumButtonprops){

    return(
        <>  
        <div className='mediumButton' onClick={onClick}>
                <h2>{content}</h2>
         </div>
        </>
    )
}

export default MediumButton;
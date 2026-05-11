import './BigButton.css'

interface BigButtonprops{
    content : string
    onClick?: () => void
}

function BigButton({content, onClick}:BigButtonprops){

    return(
        <>  
        <div className='bigButton' onClick={onClick}>
                <h2>{content}</h2>
         </div>
        </>
    )
}

export default BigButton;
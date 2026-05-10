import { useNavigate } from 'react-router'
import './BigButton.css'

interface BigButtonprops{
    content : string
}

function BigButton({content}:BigButtonprops){

    return(
        <>  
        <div className='bigButton'>
                <h2>{content}</h2>
         </div>
        </>
    )
}

export default BigButton;
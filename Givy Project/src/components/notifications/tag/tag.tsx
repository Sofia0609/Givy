import { useNavigate } from 'react-router'
import './tag.css'

interface Tag{
    content: string
    gradient: string
}

function Tag({content, gradient}:Tag){

    return(
        <>  
        <div className='Tag' style={{ background: gradient }}>
                <h3 className='tagText'>  {content} </h3>
         </div>
        </>
    )
}

export default Tag;
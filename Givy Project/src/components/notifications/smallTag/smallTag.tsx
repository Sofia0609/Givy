import { useNavigate } from 'react-router'
import './SmallTag.css'

interface SmallTagprops{
    content: string
    gradient: string
}

function SmallTag({content, gradient}:SmallTagprops){

    return(
        <>  
        <div className='SmallTag' style={{ background: gradient }}>
                <h3 className='SmallTagText'>  {content} </h3>
         </div>
        </>
    )
}

export default SmallTag;
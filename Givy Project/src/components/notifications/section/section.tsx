import { useNavigate } from 'react-router'
import './section.css'

interface Section{
    img : string
    title: string
    gradient: string
    to: string
}

function Section({img, title, gradient, to}:Section){
    const navigate = useNavigate()

    return(
        <>  
        <div className='sectionContainer' style={{ background: gradient }} onClick={() => navigate(to)}>
                <img src={img} alt="" />
                <h2>  {title} </h2>
         </div>
        </>
    )
}

export default Section;
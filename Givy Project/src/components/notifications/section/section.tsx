import './section.css'

interface Section{
    img : string
    title: string
    gradient: string
}

function Section({img, title, gradient}:Section){

    return(
        <>  
        <div className='sectionContainer' style={{ background: gradient }}>
                <img src={img} alt="" />
                <h2>  {title} </h2>
         </div>
        </>
    )
}

export default Section;
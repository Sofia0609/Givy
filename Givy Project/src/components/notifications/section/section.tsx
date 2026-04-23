import './section.css'

interface Section{
    img : string
    title: string
}

function Section({img, title}:Section){

    return(
        <>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h1>  {title} </h1>
            </div>
        </>
    )
}

export default Section;
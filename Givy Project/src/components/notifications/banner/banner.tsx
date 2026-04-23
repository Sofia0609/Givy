import './section.css'

interface Banner{
    img : string
    title: string
}

function Banner({img, title}:Banner){

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

export default Banner;
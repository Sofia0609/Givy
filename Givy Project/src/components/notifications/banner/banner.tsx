import './banner.css'

interface Banner{
    title: string
}

function Banner({title}:Banner){

    return(
        <>
            <div className='banner'>
                <h1 className='titleBanner'>  {title} </h1>
            </div>
        </>
    )
}

export default Banner;
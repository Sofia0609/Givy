import './entityCard.css'

interface EntityCard{
    photo: string,
    name: string
}

function EntityCard({name,photo}:EntityCard){

    return(
        <>
            <div className='entityCardContainer'>
                <img className='photo' src={photo} alt="" />
                <h3 className='nameEntityCard'>  {name} </h3>
            </div>
        </>
    )
}

export default EntityCard;
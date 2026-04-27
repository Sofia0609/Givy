import Tag from '../tag/tag';
import './entityCard.css'

interface EntityCard{
    photo: string,
    name: string
    content: string
    content2 : string
}

function EntityCard({name,photo, content, content2}:EntityCard){

    return(
        <>
            <div className='entityCardContainer'>
                <img className='photo' src={photo} alt="" />
                <div className='entityCardContent'>
                    <h3 className='nameEntityCard'>  {name} </h3>
                    <div className='tags'>
                        <Tag content={content} gradient="var(--color-purple-light-buttons)" ></Tag>
                        <Tag content={content2} gradient="var(--color-bg-main)" ></Tag>
                    </div>
                    <div className='entityCardButtons'>
                        <img src="./assets/accept_swap_icon.svg" alt="" />
                        <img src="./assets/decline_swap_icon.svg" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EntityCard;
import Tag from '../tag/tag';
import './entityCard.css'

interface EntityCard{
    photo: string,
    name: string
    content?: string
    content2? : string
    desicionButtons?: boolean
    beginButton?: boolean
}

function EntityCard({name,photo, content, content2, desicionButtons, beginButton}:EntityCard){

    return(
        <>
            <div className='entityCardContainer'>
                <img className='photo' src={photo} alt="" />
                <div className='entityCardContent'>
                    <div className='entityCardLeft'>
                        <h3 className='nameEntityCard'>  {name} </h3>
                        <div className='tags'>
                            {content && <Tag content={content} gradient="var(--color-purple-light-buttons)" ></Tag>}
                            <img src="./src/assets/tag_swap_icon.svg" alt="" />
                            <Tag content={content2} gradient="var(--color-bg-main)" ></Tag>
                        </div>
                    </div>
                    {desicionButtons &&(
                    
                        <div className='entityCardButtons'>
                            <img className='decisionButton' src="./src/assets/accept_swap_icon.svg" alt="" />
                            <img className='decisionButton' src="./src/assets/decline_swap_icon.svg" alt="" />
                        </div>
                        
                    )}
                    {beginButton &&(
                        <div className='entityCardButtons'>
                            <button id='beginButton'>Begin</button>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default EntityCard;
import Tag from '../tag/tag';
import './entityCard.css'

interface EntityCard{
    photo: string | undefined,
    name: string
    description?: string
    content?: string
    content2? : string
    desicionButtons?: boolean
    button?: string
    id?:string
    onAccept?: () => void  
    onReject?: () => void
}

function EntityCard({name,photo, description, content, content2, desicionButtons, button,id, onAccept, onReject}:EntityCard){

    return(
        <>
            <div className='entityCardContainer'>
                <img className='photo' src={photo} alt="" />
                <div className='entityCardContent'>
                    <div className='entityCardLeft'>
                        <h3 className='nameEntityCard'>  {name} </h3>
                        {description && <p className='description'>{description}</p>}
                        <div className='tags'>
                            {content && <Tag content={content} gradient="var(--color-purple-light-buttons)" ></Tag>}
                            {content && content2 && <img src="./src/assets/tag_swap_icon.svg" alt="" />}
                            {content2 &&<Tag content={content2} gradient="var(--color-bg-main)" ></Tag>}
                        </div>
                    </div>
                    {desicionButtons &&(
                    
                        <div className='entityCardButtons'>
                            <img className='decisionButton' src="./src/assets/accept_swap_icon.svg" alt="" onClick={onAccept} />
                            <img className='decisionButton' src="./src/assets/decline_swap_icon.svg" alt="" onClick={onReject} />
                        </div>
                        
                    )}
                    {button &&(
                        <div className='entityCardButtons'>
                            <button id='button'>{button}</button>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default EntityCard;
interface ChipNavBar{
    icon: string
    chip: string
}

function ChipNavBar({icon, chip}: ChipNavBar){

    return(
        <li className="chip">
            <img src={icon} alt="" />
            <span> {chip} </span>
        </li>
    )
}

export default ChipNavBar;
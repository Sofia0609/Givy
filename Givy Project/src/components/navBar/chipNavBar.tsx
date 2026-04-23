import { NavLink } from "react-router"
import './navBar.css'

interface ChipNavBar{
    icon: string
    chip: string
    to: string
}

function ChipNavBar({icon, chip,to}: ChipNavBar){

    return(
        <NavLink to={to}>
            <li className="chip">
                <img src={icon} alt="" />
                <span className="chipName"> {chip} </span>
            </li>
        </NavLink>
    )
}

export default ChipNavBar;
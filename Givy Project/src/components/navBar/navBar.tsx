import ChipNavBar from "./chipNavBar";
import './navBar.css'
import logotype from '../../assets/Logotype.png'
import homeIcon from '../../assets/home_icon.svg'
import searchIcon from '../../assets/search_icon.svg'
import notificationIcon from '../../assets/notification_icon.svg'
import userIcon from '../../assets/user_icon.svg'
import createIcon from '../../assets/create_icon.svg'


function NavBar({}){

    return(
        <>
        <div id="navBarContainer">
            <div className="presentation">
                <img className="Logotype" src={logotype} alt="logotype" /> 
                <span>Welcome to Givy!</span>
                <span id="namePresentation">Anonimo123</span>
            </div>
            <div>
                <nav>
                    <ul className="navBar">
                        <ChipNavBar icon={homeIcon} chip="Feed" to="/Feed" />
                        <ChipNavBar icon={searchIcon} chip="Search" to="/Search" />
                        <ChipNavBar icon={notificationIcon} chip="Notifications" to="/Notifications" />
                        <ChipNavBar icon={userIcon} chip="Profile" to="/Profile" />
                        <ChipNavBar icon={createIcon} chip="Create" to="/Create" />
                    </ul>
                </nav>
            </div>
        </div>
        </>
    )
}

export default NavBar;
import ChipNavBar from "./chipNavBar";
import './navBar.css'

function NavBar({}){

    return(
        <>
        <div id="navBarContainer">
            <div className="presentation">
                <img className="Logotype" src="src/assets/Logotype.png" alt="logotype" /> 
                <span>Welcome to Givy!</span>
                <span id="namePresentation">Anonimo123</span>
            </div>
            <div>
                <nav>
                    <ul className="navBar">
                        <ChipNavBar icon = "src/assets/home_icon.svg" chip = "Feed" ></ChipNavBar>
                        <ChipNavBar icon = "src/assets/search_icon.svg" chip = "Search" ></ChipNavBar>
                        <ChipNavBar icon = "src/assets/notification_icon.svg" chip = "Notifications" ></ChipNavBar>
                        <ChipNavBar icon = "src/assets/user_icon.svg" chip = "Profile" ></ChipNavBar>
                        <ChipNavBar icon = "src/assets/create_icon.svg" chip = "Create" ></ChipNavBar>
                    </ul>
                </nav>
            </div>
        </div>
        </>
    )
}

export default NavBar;
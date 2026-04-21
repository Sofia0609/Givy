import ChipNavBar from "./chipNavBar";


interface NavBar{
    
}

function NavBar({}){

    return(
        <>
        <div>
            <img src="./assets/Logotipo_GIVY2@4x 2.png" alt="logotype" /> 
            <span>Welcome to Givy!</span>
            <span>Anonimo123</span>
        </div>
        <div>
            <nav>
                <ul>
                    <ChipNavBar icon = "Givy Project/src/assets/Logotipo_GIVY2@4x 2.png" chip = "Feed" ></ChipNavBar>
                </ul>
            </nav>
        </div>
        </>
    )
}

export default NavBar;
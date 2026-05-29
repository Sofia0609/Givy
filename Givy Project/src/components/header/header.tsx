import { useNavigate } from 'react-router';
import './header.css'

interface Header{
    title: string
}

function Header({ title }: Header) {
    const navigate = useNavigate();

    return (
        <div className='header'>
            <img onClick={() => navigate(-1)} className='returnIcon' src="./src/assets/return_icon.svg" alt="" />
            <h2 className='headerTitle'>{title}</h2>
        </div>
    )
}

export default Header;
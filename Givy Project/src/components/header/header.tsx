import './header.css'

interface Header{
    title: string
}

function Header({ title }: Header) {
    return (
        <div className='header'>
            <h2 className='headerTitle'>{title}</h2>
        </div>
    )
}

export default Header
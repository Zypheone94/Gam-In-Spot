// import images
import logo from '../../../assets/images/logo.png'
import User from '../../../assets/images/icons/user.svg'
import Main from '../../../assets/images/banner/main.jpg'

// import styles
import './header.css'

//import component
import SearchBar from "../searchbar/SearchBar.jsx";

function Header() {

    return (
        <>
            <header className='flex h-32 py-8'>
                <img src={logo} alt="Logo Gam'In-Spot" className='w-44 object-contain' id='logo'/>
                <SearchBar/>
                <img src={User} alt="Logo Gam'In-Spot" className='w-6' id='userIcon'/>
            </header>
            <div id="mainBanner" style={{
                background: `url(${Main})`,
                height: '200px',
                backgroundPosition: '50% 100%',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'
            }}></div>
        </>
    );
}

export default Header

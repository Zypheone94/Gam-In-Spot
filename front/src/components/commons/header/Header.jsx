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
            <header className='flex items-center h-28 px-12'>
                <div className="flex-1">
                    <img src={logo} alt="Logo Gam'In-Spot" className='w-56 object-contain ' id='logo'/>
                </div>
                <div className="flex flex-1 justify-center">
                    <SearchBar/>
                </div>
                <div className='flex flex-1 justify-center'>
                    <div style={{
                        border: '1px solid silver',
                        borderRadius: '5px',
                        padding: '7px'
                    }}>
                        <p className="text-purple">Ajouter article +</p>
                    </div>
                    <div className="flex items-center ml-10">
                        <img src={User} alt="Logo Gam'In-Spot" className='w-6 cursor-pointer' id='userIcon'/>
                        <p className='text-purple font-[Poppins] ml-4 cursor-pointer'>Mon compte</p>
                    </div>
                </div>

            </header>
            <div id="mainBanner" style={{
                background: `url(${Main})`,
                height: '250px',
                backgroundPosition: '50% 100%',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'
            }}></div>
        </>
    );
}

export default Header

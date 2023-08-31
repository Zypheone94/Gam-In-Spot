// import images
import logo from '../../../assets/images/logo.png'
import logoutIcon from '../../../assets/images/icons/logout.svg'
import User from '../../../assets/images/icons/user.svg'
import Main from '../../../assets/images/banner/main.jpg'

//import component
import SearchBar from "../searchbar/SearchBar.jsx";

import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function Header() {

    const navigate = useNavigate()

    const user = useSelector(state => state.user)
    const redirection = () => {
        if (user === null) {
            navigate('/login')
        } else {
            navigate('/profile')
        }
    }

    const disconnect = () => {
        navigate('/logout')
    }

    return (
        <>
            <header className='
                lg:flex lg:items-center lg:h-28 lg:px-12 lg:relative lg:flex-row
                py-8 md:bg-white md:flex md:flex-col md:justify-center md:items-center md:w-full
                fixed top-0 bg-white flex flex-col w-full items-center'>
                <div className="lg:flex-1 lg:pb-0 md:pb-4">
                    <img src={logo} alt="Logo Gam'In-Spot" className='lg:w-56 md:w-44 md:object-contain md:block hidden'
                         id='logo'/>
                </div>
                <div className="
                lg:flex lg:flex-1 lg:justify-center lg:pb-0
                md:pb-4">
                    <SearchBar/>
                </div>
                <div className='flex mt-6 md:mt-0 lg:flex-1 lg:justify-center'>
                    {user !== null &&
                        <div style={{
                            border: '1px solid silver',
                            borderRadius: '5px',
                            padding: '7px'
                        }}>
                            <p className="text-purple">Ajouter article +</p>
                        </div>
                    }
                    <div className="flex items-center ml-10">
                        <img src={User} alt="Logo Gam'In-Spot" className='w-6 cursor-pointer'
                             id='userIcon'/>
                        <p className='text-purple font-[Poppins] ml-2 cursor-pointer hidden md:block'
                           onClick={redirection}>
                            {user && user.username ? user.username : "Mon compte"}
                        </p>
                        {user === null || user.username === undefined ? (
                            <></>
                        ) : (
                            <img src={logoutIcon} alt="Deconnect Icon" className='w-6 cursor-pointer ml-6'
                                 id='userIcon' onClick={disconnect}/>
                        )}
                    </div>
                </div>

            </header>
            <div className='my-8 h-36 md:hidden'></div>
            <div className="lg:mt-0 md:block md:mt-32 hidden" id="mainBanner" style={{
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

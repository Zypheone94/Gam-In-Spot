import logo from '../../assets/images/logo.png'
import User from '../../assets/images/icons/user.svg'

function Header() {

    return (
        <>
            <header>
                <img src={logo} alt="Logo Gam'In-Spot"/>
                <img src={User} alt="Logo Gam'In-Spot"/>
            </header>
        </>
    );
}

export default Header

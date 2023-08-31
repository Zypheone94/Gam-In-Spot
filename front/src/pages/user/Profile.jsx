import {useEffect} from "react";
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const Profile = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user === null || user.email === undefined) {
            navigate('/login')
        }
    }, [])

    return (
        <div>
            <p>PTDR LOL La page user</p>
        </div>
    )
}

export default Profile
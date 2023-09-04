import {useEffect} from "react";
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import DateFormat from "../../utils/DateFormat.jsx";

const Profile = () => {

    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('j')
        if (user === null || user.email === undefined) {
            console.log('t')
            navigate('/login')
        }
    }, [])

    return (

        <section className='mx-4'>
            {user !== null ? (
                <>
                    <div>
                        <h3 className='text-pink'>Information du compte</h3>
                        <div>
                            <p className='text-deepPurple'><span
                                className='underline font-bold'>Nom :</span> {user.last_name}
                            </p>
                            <p className='text-deepPurple'><span
                                className='underline font-bold'>Prénom :</span> {user.first_name}</p>
                            <p className='text-deepPurple'><span
                                className='underline font-bold'>Date de naissance :</span>
                                <DateFormat type="birthDate"/></p>
                            <p className='text-deepPurple'><span
                                className='underline font-bold'>Date de création du compte :</span> <DateFormat
                                type="creationAccountDate"/></p>
                        </div>
                    </div>
                    <div className=''
                         style={{
                             border: "1px solid #4361EE",
                             background: "#EBEBEB"
                         }}>

                        <div>
                            Paramètre du compte
                        </div>
                        <div>
                            Dernier produits en lignes
                        </div>
                    </div>
                </>
            ) : (
                <></>
            )}
        </section>

    )
}

export default Profile
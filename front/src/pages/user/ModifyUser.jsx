import React, {useState, useEffect} from 'react';
import UserForm from "../../components/forms/UserForm.jsx";

import {api} from "../../utils/api.jsx";

import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom"

const UserProfile = () => {
    const user = useSelector(state => state.user)

    const [userData, setUserData] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
    });

    useEffect(() => {
        if (user) {
            // Mettez à jour userData en fusionnant avec les nouvelles valeurs
            setUserData((prevUserData) => ({
                ...prevUserData,
                email: user.email || '',
                username: user.username || '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
            }));
            console.log(userData)
        } else {
            useLocation('/login')
        }
    }, []);


    const handleUpdateUser = async (updatedUserData) => {
        let requestDate = {
            id: user.id,
            data: updatedUserData
        }
        try {
            const updatedUser = await api('/users/modify', 'PUT', requestDate);
            setUserData(updatedUser);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        }
    };

    return (
        <div>
            <h1>Profil de l'utilisateur</h1>
            {
                userData.email !== '' ? (
                    <UserForm user={userData} onUpdate={handleUpdateUser}/>
                    
                ) : (
                    <></>
                )
            }
        </div>
    );
};

export default UserProfile;

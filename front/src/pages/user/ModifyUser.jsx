import React, {useState, useEffect} from 'react';
import UserForm from "../../components/forms/UserForm.jsx";

import {api} from "../../utils/api.jsx";
import delaiRender from "../../utils/DelaiRender.jsx";

import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import {setUser} from "../../redux/actions/userActions.jsx";

import {useDispatch} from 'react-redux';
import DelaiRender from "../../utils/DelaiRender.jsx";

const UserProfile = () => {
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        birthDate: ''
    });

    useEffect(() => {
        if (user && user.email !== undefined) {
            setUserData((prevUserData) => ({
                ...prevUserData,
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                birthDate: user.birthDate || ''
            }));
        } else {
            navigate('/login')
        }
    }, []);

    const handleUpdateUser = async (updatedUserData) => {
        console.log(updatedUserData)
        let requestDate = {
            id: user.id,
            data: updatedUserData
        }
        try {
            const updatedUser = await api('/users/modify', 'PUT', requestDate);
            setUserData(updatedUser);
            const newUserValue = await api('/users/detail', 'POST', requestDate)
            dispatch(setUser(newUserValue.user));
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        }
    };

    return (
        <div className="mx-12">
            <h1 className="text-pink">Profil de l'utilisateur</h1>
            <DelaiRender>
                <UserForm user={userData} onUpdate={handleUpdateUser}/>
            </DelaiRender>
        </div>
    );
};

export default UserProfile;

import React, {useState} from 'react';
import {api} from "../../utils/api.jsx";

import {useNavigate} from "react-router-dom"

const UserPasswordForm = ({user}) => {

    const [formData, setFormData] = useState();
    const [returnError, setReturnError] = useState('')
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleUpdatePassword = async (updatedUserData) => {
        let requestDate = {
            email: user.email,
            data: updatedUserData
        }
        try {
            const updatedUser = await api('/users/password', 'POST', requestDate);
            updatedUser.status === 200 ?
                navigate('/profile') :
                updatedUser.error === 50 ?
                    setReturnError('Votre mot de passe actuelle est incorrect') :
                    null
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        }
    };

    const calcPasswordSecurity = () => {
        const password = formData?.confirm;

        if (!password || password.length < 7) {
            return 0; // Retourne 0 si le mot de passe est vide ou a moins de 7 caractères
        }

        let containsUppercase = false;
        let containsLowercase = false;
        let containsDigit = false;
        let containsSpecialChar = false;
        let passwordLength = false

        if (!password || password.length < 7) {
            passwordLength = true;
        }

        for (let i = 0; i < password.length; i++) {
            const character = password[i];

            if (character >= 'A' && character <= 'Z') {
                containsUppercase = true;
            } else if (character >= 'a' && character <= 'z') {
                containsLowercase = true;
            } else if (character >= '0' && character <= '9') {
                containsDigit = true;
            } else {
                const specialChars = "!@#$%^&*";
                if (specialChars.includes(character)) {
                    containsSpecialChar = true;
                }
            }
        }

        if (containsUppercase && containsLowercase && containsDigit && containsSpecialChar && passwordLength) {
            return 5;
        }

        return containsUppercase + containsLowercase + containsDigit + containsSpecialChar + passwordLength;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdatePassword(formData)
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                <div className="flex justify-between mt-8 text-center
                md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '300px'
                    }}>Nouveau mot de passe</label>
                    <input
                        type="password"
                        name="new_password"
                        placeholder="Nouveau mot de passe"
                        required
                        onChange={() => {
                            handleInputChange;
                            calcPasswordSecurity();
                        }}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <p>{calcPasswordSecurity()}</p>
                <div className="flex justify-between mt-8 text-center
                md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '300px'
                    }}>Confirmation</label>
                    <input
                        type="password"
                        name="confirm"
                        placeholder="Confirmation mot de passe"
                        required
                        onChange={handleInputChange}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-8 text-center
                md:justify-around md:mt-12">
                    <label style={{
                        width: '300px'
                    }}>Mot de passe actuel</label>
                    <input
                        type="password"
                        name="actual_password"
                        placeholder="Mot de passe actuel"
                        onChange={handleInputChange}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>

                <button type="submit" className="mt-8 text-right duration-200
                md:mt-12
                hover:text-pink">Enregistrer
                </button>
            </form>
            {
                returnError ? (
                    <p style={{color: 'red'}}>{returnError}</p>
                ) : (
                    <></>
                )
            }
        </>
    );
};

export default UserPasswordForm;

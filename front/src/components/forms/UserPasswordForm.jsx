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
        calcPasswordSecurity();
    };

    const handleUpdatePassword = async (updatedUserData) => {
        let requestDate = {
            email: user.email,
            data: updatedUserData
        }
        try {
            const updatedUser = await api('/users/password', 'POST', requestDate);
            updatedUser.error === 0 ?
                navigate('/profile') :
                updatedUser.error === 50 ?
                    setReturnError('Votre mot de passe actuelle est incorrect') :
                    null
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
        }
    };

    const calcPasswordSecurity = () => {
        const password = formData?.new_password;

        let containsUppercase = false;
        let containsLowercase = false;
        let containsDigit = false;
        let containsSpecialChar = false;
        let passwordLength = false

        if (password) {

            if (!password || password.length > 7) {
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
        }

        if (containsUppercase && containsLowercase && containsDigit && containsSpecialChar && passwordLength) {
            return 5;
        }

        return containsUppercase + containsLowercase + containsDigit + containsSpecialChar + passwordLength;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.new_password === formData.confirm) {
            if(calcPasswordSecurity() <= 2) {
                setReturnError('Votre mot de passe n\'est pas assez sécurisé')
            }
            else {
                handleUpdatePassword(formData)
            }
        } else {
            setReturnError('Les mots de passes entrés ne sont pas identiques')
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                <div className="flex justify-between mt-8 text-center
                md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '300px'
                    }}>Nouveau mot de passe</label>
                    <div className="w-3/4 md:w-2/4 flex flex-col items-end">
                        <input
                            type="password"
                            name="new_password"
                            placeholder="Nouveau mot de passe"
                            required
                            onChange={
                                handleInputChange
                            }
                            className='p-1'
                            style={{
                                border: '1px solid #F72585',
                                borderRadius: '10px',
                                width: '100%'
                            }}
                        />
                        <div style={{
                            width: '200px',
                            border: '1px solid black',
                            borderRadius: '10px',
                            marginTop: '20px',
                            padding: '2px'
                        }}>
                            <div style={{
                                width: `calc(20% * ${calcPasswordSecurity()})`,
                                height: '10px',
                                borderRadius: '10px',
                                backgroundColor: calcPasswordSecurity() === 1 ? 'red'
                                    : calcPasswordSecurity() === 2 ? 'orange'
                                        : calcPasswordSecurity() === 3 ? 'orange'
                                            : calcPasswordSecurity() === 4 ? 'lime'
                                                : calcPasswordSecurity() === 5 ? 'lime' : ''
                            }} />
                        </div>
                    </div>
                </div>

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

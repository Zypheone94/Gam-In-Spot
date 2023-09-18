import React, {useEffect, useState} from 'react';
import {api} from "../../utils/api.jsx";
import {useNavigate} from "react-router-dom";

const UserDataForm = ({user}) => {

    const [formMail, setFormMail] = useState(user.email);
    const [onLoad, setOnLoad] = useState(false)
    const [displayVerification, setDisplayVerification] = useState(false)
    const [checkCode, setCheckCode] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if (user && user.email !== undefined){
            null
        }
        else {
            navigate('/login')
        }
    })

    const handleInputChange = (e) => {
        setFormMail(e.target.value);
    };

    const handleCodeChange = (e) => {
        setCheckCode(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setOnLoad(true)
        try {
            const response = await api('users/validation', 'POST', {formMail});
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email :', error);
        }
        setOnLoad(false)
        setDisplayVerification(true)
    };

    const handleVerifyCode = async (e) => {
        let data = {'user_mail' : user.email, 'check_code' : checkCode}
        e.preventDefault();
        try {
            const response = await api('users/validation', 'PUT', data);
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email :', error);
        }
        navigate('/profile')
    }

    return (
        <>
            {!displayVerification ?
                !onLoad ? (

                    <form onSubmit={handleSubmit} className="flex flex-col justify-center">

                        <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                            <label className="pt-1" style={{
                                width: '100px'
                            }}>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                value={formMail}
                                onChange={handleInputChange}
                                className="w-3/4 p-1 md:w-2/4"
                                style={{
                                    border: '1px solid #F72585',
                                    borderRadius: '10px'
                                }}
                            />
                        </div>


                        <button type="submit"
                                className="mt-8 text-right duration-200 md:mt-12 hover:text-pink">Enregistrer
                        </button>
                    </form>
                ) : (
                    <div>Loading </div>
                ) : (
                    <form onSubmit={handleVerifyCode} className="flex flex-col justify-center">
                        <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                            <label className="pt-1" style={{
                                width: '100px'
                            }}>Code</label>
                        <input
                            type="text"
                            name="verification_code"
                            placeholder="Code de vérification"
                            required
                            onChange={handleCodeChange}
                            className="w-3/4 p-1 md:w-2/4"
                            style={{
                                border: '1px solid #F72585',
                                borderRadius: '10px'
                            }}
                        />
                        </div>
                        <button type="submit"
                                className="mt-8 text-right duration-200 md:mt-12 hover:text-pink">Vérifier le code
                        </button>
                    </form>
                )}
        </>
    );
};

export default UserDataForm;

import React, {useState} from 'react'
import {api} from "../../utils/api.jsx";
import {useNavigate} from 'react-router-dom'

const CreateUserForm = () => {

    const [formData, setFormData] = useState('');
    const [returnError, setReturnError] = useState('')
    const [onLoad, setOnLoad] = useState(false)
    const [displayVerification, setDisplayVerification] = useState(false)
    const [checkCode, setCheckCode] = useState('')
    const [returnMessage, setReturnMessage] = useState('')

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleCodeChange = (e) => {
        setCheckCode(e.target.value)
    }

    const handleSubmit = async (e) => {
        if (formData.password === formData.verify_password) {
            e.preventDefault()
            setOnLoad(true)
            try {
                const response = await api('users/validation', 'POST', {'formMail': formData.email});
            } catch (error) {
                console.error('Erreur lors de l\'envoi de l\'email :', error);
            }
            setOnLoad(false)
            setDisplayVerification(true)

        } else {
            e.preventDefault()
            setReturnError('Les deux mots de passes ne sont pas identiques')
        }
    }

    const handleVerifyCode = async (e) => {
        let data = {'check_code': checkCode}
        e.preventDefault();
        try {
            const response = await api('users/validation', 'PUT', data);
            if (response.status_code === 10) {
                setOnLoad(false)
                const create = await api('users/create', 'POST', formData)
                console.log(create)
                if (create.status === 10) {
                    setReturnMessage('Votre compte a bien été crée, vous allez être redirigé vers la page de connexion !')
                    setTimeout(() => {
                        navigate('/login')
                    }, 6000);
                } else if (create.status === 40) {
                    setReturnError("L'email entré est déjà associé à un compte")
                    setDisplayVerification(false)
                } else if (create.status === 50) {
                    setReturnError("Le pseudo entré est déjà utilisé")
                    setDisplayVerification(false)
                } else {
                    console.log(response)
                }
            }

            if (response.status_code === 20) {
                setReturnError('Une erreur est survenu lors de la soumission de votre code')
            }
            if (response.status_code === 15) {
                setReturnError('Code de vérification érroné')
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email :', error);
        }
    }

    return (
        <>
            {!displayVerification ?
                !onLoad ? (

                        <form className="mb-10" onSubmit={handleSubmit}>
                            <div className="flex flex-wrap">
                                <div className="mt-6 w-full flex justify-between">
                                    <label className="w-2/5">Nom</label>
                                    <input type="text"
                                           className="w-3/5 p-1 md:w-2/4"
                                           style={{
                                               border: '1px solid #F72585',
                                               borderRadius: '10px'
                                           }}
                                           name="last_name"
                                           onChange={handleInputChange}
                                           required/>
                                </div>
                                <div className="mt-6 w-full flex justify-between">
                                    <label className="w-2/5">Prénom</label>
                                    <input type="text"
                                           className="w-3/5 p-1 md:w-2/4"
                                           style={{
                                               border: '1px solid #F72585',
                                               borderRadius: '10px'
                                           }}
                                           name="first_name"
                                           onChange={handleInputChange}
                                           required/>
                                </div>
                            </div>
                            <div className="mt-6 w-full flex justify-between">
                                <label className="w-2/5">Email</label>
                                <input type="email"
                                       className="w-3/5 p-1 md:w-2/4"
                                       style={{
                                           border: '1px solid #F72585',
                                           borderRadius: '10px'
                                       }}
                                       name="email"
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="mt-6 w-full flex justify-between">
                                <label className="w-2/5">Pseudo</label>
                                <input type="text"
                                       className="w-3/5 p-1 md:w-2/4"
                                       style={{
                                           border: '1px solid #F72585',
                                           borderRadius: '10px'
                                       }}
                                       name="username"
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="mt-6 w-full flex justify-between">
                                <label className="w-2/5">Date de naissance</label>
                                <input type="date"
                                       className="w-3/5 p-1 md:w-2/4"
                                       style={{
                                           border: '1px solid #F72585',
                                           borderRadius: '10px'
                                       }}
                                       name="birthDate"
                                       onChange={handleInputChange}
                                       required/>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="mt-6 w-full flex justify-between">
                                    <label className="w-2/5">Mot de passe</label>
                                    <input type="password"
                                           className="w-3/5 p-1 md:w-2/4"
                                           style={{
                                               border: '1px solid #F72585',
                                               borderRadius: '10px'
                                           }}
                                           name="password"
                                           onChange={handleInputChange}
                                           required/>
                                </div>
                                <div className="mt-6 w-full flex justify-between">
                                    <label className="w-2/5">Confirmation</label>
                                    <input type="password" className="w-3/5 p-1 md:w-2/4"
                                           style={{
                                               border: '1px solid #F72585',
                                               borderRadius: '10px'
                                           }}
                                           name="verify_password"
                                           onChange={handleInputChange}
                                           required/>
                                </div>
                            </div>
                            {
                                returnError ? (
                                    <p style={{color: 'red', marginTop: '20px'}}>{returnError}</p>
                                ) : (
                                    <></>
                                )
                            }
                            <div className='w-full mt-12 flex flex-row-reverse justify-between'>
                                <button type="submit" className="hover:text-pink">
                                    Créer le compte
                                </button>
                                <button className="hover:text-pink" onClick={() => navigate('/login')}>
                                    Vous avez déjà un compte ?
                                </button>
                            </div>
                        </form>)
                    : (<div>Loading</div>
                    ) : <form onSubmit={handleVerifyCode} className="flex flex-col justify-center">
                    <p className='my-8'>Un code de vérification vous a été envoyé par mail !</p>
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
                            className="mt-8 mb-8 text-right duration-200 md:mt-12 hover:text-pink">Vérifier le code
                    </button>
                    <p style={{color: 'lime', marginBottom: '20px'}}>{returnMessage}</p>
                </form>
            }
        </>
    )
}

export default CreateUserForm
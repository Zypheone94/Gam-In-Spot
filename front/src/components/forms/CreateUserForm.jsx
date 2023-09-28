import React, {useState} from 'react'

const CreateUserForm = () => {

    const [formData, setFormData] = useState('');
    const [returnError, setReturnError] = useState('')

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
        console.log(formData)
    };

    const handleSubmit = (e) => {
        if (formData.password === formData.verify_password) {
            e.preventDefault()
            console.log('verification database nécessaire puis création compte')
        } else {
            e.preventDefault()
            setReturnError('Les deux mots de passes ne sont pas identiques')
        }

    }

    return (
        <>
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
                           name="birth_date"
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
                <div className='w-full mt-6 flex justify-end'>
                    <button type="submit">
                        Créer le compte
                    </button>
                </div>
            </form>
        </>
    )
}

export default CreateUserForm
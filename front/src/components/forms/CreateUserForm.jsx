import React from 'react'

const CreateUserForm = () => {


    return (
        <>
            <form className="mb-10">
                <div className="flex flex-wrap">
                    <div className="mt-6 w-full flex justify-between">
                        <label className="w-2/5">Nom</label>
                        <input type="text"
                               className="w-3/5 p-1 md:w-2/4"
                               style={{
                                   border: '1px solid #F72585',
                                   borderRadius: '10px'
                               }}/>
                    </div>
                    <div className="mt-6 w-full flex justify-between">
                        <label className="w-2/5">Prénom</label>
                        <input type="text"
                               className="w-3/5 p-1 md:w-2/4"
                               style={{
                                   border: '1px solid #F72585',
                                   borderRadius: '10px'
                               }}/>
                    </div>
                </div>
                <div className="mt-6 w-full flex justify-between">
                    <label className="w-2/5">Email</label>
                    <input type="email"
                           className="w-3/5 p-1 md:w-2/4"
                           style={{
                               border: '1px solid #F72585',
                               borderRadius: '10px'
                           }}/>
                </div>
                <div className="mt-6 w-full flex justify-between">
                    <label className="w-2/5">Pseudo</label>
                    <input type="text"
                           className="w-3/5 p-1 md:w-2/4"
                           style={{
                               border: '1px solid #F72585',
                               borderRadius: '10px'
                           }}/>
                </div>
                <div className="mt-6 w-full flex justify-between">
                    <label className="w-2/5">Date de naissance</label>
                    <input type="date"
                           className="w-3/5 p-1 md:w-2/4"
                           style={{
                               border: '1px solid #F72585',
                               borderRadius: '10px'
                           }}/>
                </div>
                <div className="flex flex-wrap">
                    <div className="mt-6 w-full flex justify-between">
                        <label className="w-2/5">Mot de passe</label>
                        <input type="password"
                               className="w-3/5 p-1 md:w-2/4"
                               style={{
                                   border: '1px solid #F72585',
                                   borderRadius: '10px'
                               }}/>
                    </div>
                    <div className="mt-6 w-full flex justify-between">
                        <label className="w-2/5">Confirmation</label>
                        <input type="password" className="w-3/5 p-1 md:w-2/4"
                               style={{
                                   border: '1px solid #F72585',
                                   borderRadius: '10px'
                               }}/>
                    </div>
                </div>
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
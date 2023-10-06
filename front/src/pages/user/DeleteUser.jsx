import DelaiRender from "../../utils/DelaiRender.jsx";
import UserDataForm from "../../components/forms/UserDataForm.jsx";
import UserMailForm from "../../components/forms/UserMailForm.jsx";
import UserPasswordForm from "../../components/forms/UserPasswordForm.jsx";
import React, {useState} from "react";

const DeleteUser = () => {

    const [deleteValue, setDeleteValue] = useState('')

    const handleSubmit = () => {
        null
    }

    return (
        <>
            <div className="mx-12 md:mt-6 md:text-lg">
                <h1 className="text-pink md:text-xl">Supprimer votre profil</h1>
                <form onSubmit={handleSubmit} className="mt-10">
                    <input type="text" onChange={e => setDeleteValue(e.target.value)} className="w-3/4 p-1 md:w-2/4"
                           style={{
                               border: '1px solid #F72585',
                               borderRadius: '10px'
                           }}/>
                    <button className="mt-8 text-right duration-200
                md:mt-12 
                hover:text-pink">Supprimer le compte
                    </button>
                </form>
            </div>
        </>
    )
}

export default DeleteUser
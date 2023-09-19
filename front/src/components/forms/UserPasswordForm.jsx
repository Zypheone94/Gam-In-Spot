import React, { useState } from 'react';

const UserPasswordForm = ({user}) => {

    const [formData, setFormData] = useState();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
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
                    <label className="pt-1" style={{
                        width: '300px'
                    }}>Confirmation</label>
                    <input
                        type="password"
                        name="confirm"
                        placeholder="Confiromation mot de passe"
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
                        className="w-3/4 px-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>

                <button type="submit" className="mt-8 text-right duration-200
                md:mt-12
                hover:text-pink">Enregistrer</button>
            </form>
        </>
    );
};

export default UserPasswordForm;

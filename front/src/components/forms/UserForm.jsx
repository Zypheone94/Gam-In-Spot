import React, { useState } from 'react';

const UserForm = ({ user, onUpdate }) => {

    const [formData, setFormData] = useState(user);

    console.log(formData)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                <div className="flex justify-between mt-8">
                    <label className="pt-1">Nom</label>
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Nom"
                        required
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-3/4 p-1"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-8">
                    <label className="pt-1">Prénom</label>
                    <input
                        type="text"
                        name="first_name"
                        placeholder="Prénom"
                        required
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-3/4 p-1"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-8">
                    <label>Date anniversaire</label>
                    <input
                        type="date"
                        name="birthDate"
                        placeholder="Date de naissance"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-3/4 px-1"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>

                <button type="submit" className="mt-8 text-right">Enregistrer</button>
            </form>
        </>
    );
};

export default UserForm;

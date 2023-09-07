import React, { useState } from 'react';

const UserForm = ({ user, onUpdate }) => {

    const [formData, setFormData] = useState({
        email: user.email,
        last_name: user.last_name || '',
        first_name: user.first_name,
        username: user.username,
        //password: user.password,
        //birthDate: user.birthDate,
    });

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
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Nom"
                    required
                    value={formData.last_name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="first_name"
                    placeholder="Prénom"
                    required
                    value={formData.first_name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Pseudo"
                    required
                    value={formData.username}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    //value={formData.password}
                    //onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="birthDate"
                    placeholder="Date de naissance"
                    //value={formData.birthDate}
                    //onChange={handleInputChange}
                />
                <button type="submit">Enregistrer</button>
            </form>
        </>
    );
};

export default UserForm;

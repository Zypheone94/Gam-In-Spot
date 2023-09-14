import React, { useState } from 'react';

const UserDataForm = ({ user, onUpdate }) => {

    const [formMail, setFormMail] = useState(user.email);

    const handleInputChange = (e) => {
        setFormMail(e.target.value);
        console.log(formMail)
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

                <button type="submit" className="mt-8 text-right duration-200
                md:mt-12
                hover:text-pink">Enregistrer</button>
            </form>
        </>
    );
};

export default UserDataForm;

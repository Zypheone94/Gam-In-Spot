import React, {useState, useEffect} from "react";
import {api} from "../../utils/api.jsx";

import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const CreateProductForm = () => {

    const navigate = useNavigate()
    const user = useSelector(state => state.user)

    useEffect(() => {
        if (user === null || user.email === undefined) {
            navigate('/login')
        }
    }, [])

    const [formValue, setFormValue] = useState({
        userId: user.id,
        title: "",
        plateforme: "",
        description: "",
        price: "",
        images: [],
    })
    const [returnError, setReturnError] = useState('')

    const handleInputChange = (e) => {
        const {name, value, type} = e.target;
        if (type === "file") {
            const files = Array.from(e.target.files)
            if (files.length > 3) {
                setReturnError('Vous ne pouvez pas envoyer plus de 3 photos.')
            } else {
                setReturnError('')
            }
            console.log("files:", files)
        } else {
            setFormValue({...formValue, [name]: value});
        }
        console.log(formValue);
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await api('products/product/create', 'POST', formValue);
        console.log(response)
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col">

                <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Titre</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Titre"
                        required
                        value={formValue?.title}
                        onChange={(e) => handleInputChange(e)}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Plateforme</label>
                    <input
                        type="text"
                        name="plateforme"
                        placeholder="Plateforme"
                        required
                        value={formValue?.plateforme}
                        onChange={(e) => handleInputChange(e)}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Description</label>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        required
                        value={formValue?.description}
                        onChange={(e) => handleInputChange(e)}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-8 text-center md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Prix</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Prix"
                        required
                        value={formValue?.price}
                        onChange={(e) => handleInputChange(e)}
                        className="w-3/4 p-1 md:w-2/4"
                        style={{
                            border: '1px solid #F72585',
                            borderRadius: '10px'
                        }}
                    />
                </div>
                <div className="flex justify-between mt-8 items-center md:justify-around md:mt-12">
                    <label className="pt-1" style={{
                        width: '100px'
                    }}>Photo de votre article</label>
                    <input
                        type="file"
                        name="images"
                        multiple
                        accept=".jpg, .jpeg, .png"
                        max="3"
                        onChange={(e) => handleInputChange(e)}
                        className="w-3/4 p-1 md:w-2/4"
                    />
                </div>
                {
                    returnError ? (
                        <p style={{color: 'red', marginTop: '20px'}}>{returnError}</p>
                    ) : (
                        <></>
                    )
                }
                <button type="submit" className="hover:text-pink my-12 text-right" disabled={returnError !== ''}
                        style={{
                            color: returnError !== '' ? 'grey' : ''
                        }}>
                    Mettre en ligne l'annonce
                </button>
            </form>
        </>
    )
}

export default CreateProductForm
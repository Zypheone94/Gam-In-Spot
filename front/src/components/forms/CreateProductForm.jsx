import React, {useState, useEffect} from "react";
import {apiFile} from "../../utils/apiFile.jsx";
import {api} from "../../utils/api.jsx";
import Selector from "../commons/Selector.jsx";

import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const CreateProductForm = () => {

    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const [categoryList, setCategoryList] = useState([])
    const [selectedValue, setSelectedValue] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (user === null || user.email === undefined) {
            navigate('/login')
        }
        setIsLoading(true)
        api('products/product/loadcat')
            .then(response => {
                console.log(response);
                response.forEach((value) => {
                    if (!categoryList.includes(value.title)) {
                        categoryList.push(value.title)
                    }
                })
                setIsLoading(false)
                console.log(categoryList)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const [formValue, setFormValue] = useState({
        seller_id: user.id,
        title: "",
        plateform: "",
        productDescription: "",
        price: "",
        images: [],
    })
    const [returnError, setReturnError] = useState('')

    const handleInputChange = (e) => {
        const {name, value, type} = e.target;
        if (type === "file") {
            const files = e.target.files;
            const filesArray = Array.from(files);

            if (filesArray.length > 3) {
                setReturnError('Vous ne pouvez pas envoyer plus de 3 photos.');
            } else {
                setFormValue({...formValue, ['images']: filesArray});
                setReturnError('');
                console.log("files:", filesArray);
            }
        } else {
            const {value} = e.target;
            setFormValue({...formValue, [name]: value});
        }
        console.log(formValue)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await apiFile('products/product/create', formValue);
        console.log(response)
    }

    return (
        <>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col">

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
                        name="plateform"
                        placeholder="Plateforme"
                        required
                        value={formValue?.plateform}
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
                        name="productDescription"
                        placeholder="Description"
                        required
                        value={formValue?.productDescription}
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
                {!isLoading ? (
                    <Selector selectorList={categoryList} setValue={setSelectedValue}/>

                ) : (
                    <p>Loading...</p>
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
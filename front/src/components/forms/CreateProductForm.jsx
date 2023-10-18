import React, {useState} from "react";

const CreateProductForm = () => {

    const [formValue, setFormValue] = useState({
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
            console.log("files:", files)
        } else {
            setFormValue({...formValue, [name]: value});
        }
        console.log(formValue);
    }


    const handleSubmit = () => {
        console.log('sub')
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
                    }}>Titre</label>
                    <input
                        type="text"
                        name="Plateforme"
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
                <button type="submit" className="hover:text-pink my-12 text-right">
                    Mettre en ligne l'annonce
                </button>
            </form>
        </>
    )
}

export default CreateProductForm
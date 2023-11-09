import CreateProductForm from "../../components/forms/CreateProductForm.jsx";

const CreateProduct = () => {


    return (
        <div className='mx-2 md:mx-12 md:mt-64 lg:mt-6 lg:mx-48'>
            <h2 className='text-pink font-bold mb-4'>Mettre un article en vente</h2>
            <CreateProductForm/>
        </div>

    )
}

export default CreateProduct
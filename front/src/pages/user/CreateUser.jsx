import CreateUserForm from "../../components/forms/CreateUserForm.jsx";

const CreateUser = () => {

    return (
        <div className='mx-2 md:mx-12 md:mt-6'>
            <h2 className='text-pink font-bold mb-4'>Créer un compte</h2>
            <CreateUserForm/>
        </div>
    )
}

export default CreateUser
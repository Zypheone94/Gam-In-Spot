// import styles

// import images
import square from '../../../assets/images/icons/square.svg'

function SearchBar() {

    return (
        <>
            <form className='flex'>
                <input style={{
                    border: '1px solid #F72585',
                    borderRadius: '10px',
                    height: '30px'
                }}/>
                <button type='submit' className='w-6'>
                    <img src={square} alt='Valide' />
                </button>
            </form>
        </>
    );
}

export default SearchBar

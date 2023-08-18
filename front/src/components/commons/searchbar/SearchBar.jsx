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
                    height: '35px',
                    width: '500px',
                    paddingLeft: '10px'
                }}
                placeholder="Search..."/>
            </form>
        </>
    );
}

export default SearchBar

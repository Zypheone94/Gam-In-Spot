import {useState} from "react";

import square from '../../../assets/images/icons/square.svg'
import {useNavigate} from "react-router-dom";


function SearchBar() {

    const navigate = useNavigate()

    const [searchValue, setSearchValue] = useState()

    const search = e => {
        e.preventDefault()
        console.log(searchValue)
        navigate('/search?=' + searchValue)
    }

    return (
        <>
            <form className='flex w-9/12 md:w-4/5' onSubmit={search}>
                <input style={{
                    border: '1px solid #F72585',
                    borderRadius: '10px',
                    height: '35px',
                    paddingLeft: '10px'
                }}
                       onChange={e => setSearchValue(e.target.value)}
                       placeholder="Search..."/>
            </form>
        </>
    );
}

export default SearchBar

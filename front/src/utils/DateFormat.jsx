import {useSelector} from "react-redux";

const DateFormat = ({type}) => {

    const user = useSelector(state => state.user)

    let sliced = null

    if(user !== null || user.mail !== undefined){
        sliced = type === 'birthDate' ? user.birthDate.split('-')
            : type === 'creationAccountDate' ? user.creationAccountDate.split('-')
                : null
    }
    
    return (
        <>
            {sliced[2] + '/' + sliced[1] + '/' + sliced[0]}
        </>
    )
}
export default DateFormat
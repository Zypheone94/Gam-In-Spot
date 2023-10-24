import {useSelector} from "react-redux";

const DateFormat = ({type, value}) => {

    const user = useSelector(state => state.user)

    let sliced = null

    if (user !== null && user.email !== undefined && type !== null) {
        sliced = type === 'birthDate' ? user.birthDate.split('-')
            : type === 'creationAccountDate' ? user.creationAccountDate.split('-')
                : null
    }
    else if (value !== null) {
        sliced = value.split('-')
    }

    return (

        sliced !== null ? (
            <>
                {sliced[2] + '/' + sliced[1] + '/' + sliced[0]}
            </>
        ) : (
            <></>
        )

    )
}
export default DateFormat
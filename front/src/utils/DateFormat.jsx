const DateFormat = ({value}) => {


    let sliced = null

    if (value !== null) {
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
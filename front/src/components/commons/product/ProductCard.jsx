const ProductCard = () => {



    return (
        <div style={{
            border: '1px solid #4361EE',
            borderRadius: '20px',
            width: '200px',
            height: '300px'
        }}>
            <div style={{
                height: '55%'
            }}>
                Img
            </div>
            <div className='text-lightPurple px-2' style={{
                height: '45%',
                borderTop: '2px solid #4361EE'
            }}>
                <div className='flex justify-between text-deepPurple'>
                    <p className='font-semibold'>Mario</p>
                    <p className='font-semibold'>20.5€</p>
                </div>
                <p>
                    De: Dorian Peruch
                </p>
                <p>
                    Mise en ligne : 12/09/2023
                </p>
            </div>
        </div>
    )
}

export default ProductCard
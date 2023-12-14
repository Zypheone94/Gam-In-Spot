const ProductCartCard = ({product}) => {

    return (
        <>
            <div className='flex justify-between my-10'>
                <div className='w-3/12'>
                    <img className='rounded-xl'
                         style={{
                             objectFit: 'contain',
                             objectPosition: '50% 50%'
                         }}
                         src={product.image ? product.image : '../../src/assets/images/Placeholder.jpg'}
                         alt="Product Image"/>
                </div>
                <h1 className='w-4/12'>{product.title}</h1>
                <p className='w-4/12'>{product.price}</p>
                <div style={{
                    color: "red",
                    cursor: "pointer"
                }} className='w-1/12'>X
                </div>
            </div>
        </>
    )
}

export default ProductCartCard
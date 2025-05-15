import './AllProducts';

interface ProductProps {
    id: number,
    name: string,
    description: string,
    price: number,
    owner: string,
}

const ProductCard = ({...product}: ProductProps): JSX.Element => {


    return (
        <div id='product-card'>
            hello
        </div>
    )
}

export default ProductCard;

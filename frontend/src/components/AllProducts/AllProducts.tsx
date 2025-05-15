import './AllProducts.css';
import ProductCard from './ProductCard';

const AllProducts = (): JSX.Element => {

    let products = [
        {
           id: 1,
           name: 'product 1',
           description: 'a product description',
           price: 100,
           owner: 'Someone 1',
        },
        {
           id: 2,
           name: 'product 2',
           description: 'a product description',
           price: 200,
           owner: 'Someone 2',
        },
        {
           id: 3,
           name: 'product 3',
           description: 'a product description',
           price: 300,
           owner: 'Someone 3',
        },
        {
           id: 4,
           name: 'product 4',
           description: 'a product description',
           price: 400,
           owner: 'Someone 4',
        },
        {
           id: 5,
           name: 'product 5',
           description: 'a product description',
           price: 500,
           owner: 'Someone 5',
        },

    ]
    return (
        <div id='all-products'>
            {products.map((product, i) => (
                <div key={`${i}-${product.id}`}>
                    <ProductCard {...product} />
                </div>
            ))}
        </div>
    )
}

export default AllProducts;

import './AllProducts.css';
import ProductCard from './ProductCard';
import img1 from './example-images/exampleimage1.png'
import img2 from './example-images/exampleimage2.png'
import img3 from './example-images/exampleimage3.png'

const AllProducts = (): JSX.Element => {

    let products = [
        {
           id: 1,
           name: 'First Product',
           description: 'a product description',
           price: 100,
           owner: 'Someone 1',
           image: img1
        },
        {
           id: 2,
           name: 'Second Product',
           description: 'a product description',
           price: 200,
           owner: 'Someone 2',
           image: img2
        },
        {
           id: 3,
           name: 'Third Product',
           description: 'a product description',
           price: 300,
           owner: 'Someone 3',
           image: img3
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

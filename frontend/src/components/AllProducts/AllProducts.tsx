import { useDispatch, useSelector } from 'react-redux';
import './AllProducts.css';
import ProductCard from './ProductCard';
import img1 from './example-images/exampleimage1.png'
import img2 from './example-images/exampleimage2.png'
import img3 from './example-images/exampleimage3.png'
import { useEffect, useState } from 'react';
import { getAllProductsThunk } from '../../redux/products';
import { RootState } from '../../redux/store';

const AllProducts = (): JSX.Element => {
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.products.allProducts);

    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
        const getAllProducts = async () => {
            await dispatch(getAllProductsThunk());
            setIsLoaded(true);
        }
        if (!isLoaded) {
            getAllProducts()
        }
    }, [dispatch, isLoaded, products])
    console.log(products, 'PRODUCTSSSSSSSSSS')
    // let tempProducts = [
    //     {
    //        id: 1,
    //        name: 'First Product',
    //        description: 'a product description',
    //        price: 100,
    //        owner: 'Someone 1',
    //        image: img1
    //     },
    //     {
    //        id: 2,
    //        name: 'Second Product',
    //        description: 'a product description',
    //        price: 200,
    //        owner: 'Someone 2',
    //        image: img2
    //     },
    //     {
    //        id: 3,
    //        name: 'Third Product',
    //        description: 'a product description',
    //        price: 300,
    //        owner: 'Someone 3',
    //        image: img3
    //     },

    // ]
    let avgRating = 5
    if (isLoaded) {
        return (
            <div id='all-products'>
            {products && products.length ? products.map((product, i) => {
                return (
                    <div key={`${i}-${product.id}`}>
                        <ProductCard {...product} avgRating={avgRating} />
                    </div>
            )
        }) : ''}
        </div>
    )
}
else return <h1>Loading...</h1>;
}

export default AllProducts;

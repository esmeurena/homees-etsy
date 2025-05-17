import { useDispatch, useSelector } from 'react-redux';
import './AllProducts.css';
import ProductCard from './ProductCard';
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

    if (isLoaded) {
        return (
            <div id='all-products'>
            {products && products.length ? products.map((product, i) => {
                return (
                    <div key={`${i}-${product.id}`}>
                        <ProductCard {...product} />
                    </div>
            )
        }) : ''}
        </div>
    )
}
else return <h1>Loading...</h1>;
}

export default AllProducts;

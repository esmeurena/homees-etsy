import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GetSingleProduct.css'
import ProductCard from '../AllProducts/ProductCard';
import { useParams } from 'react-router-dom';
import { getSingleProductThunk } from '../../redux/products';



const GetSingleProduct = (): JSX.Element => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();

    const product = useSelector((state) => state.products.byId[id])

    useEffect(() => {

    const singleProduct = async () => {
        await dispatch(getSingleProductThunk(id));
        setIsLoaded(true);
    }

        if (!isLoaded) {
            singleProduct();
        }
        
    }, [isLoaded, dispatch, id]);

    if(!isLoaded) {
        return <h1>Loading...</h1>
    } else {


    return (
        <div>
            <ProductCard product={product} />
        </div>
    );
    }
}

export default GetSingleProduct;
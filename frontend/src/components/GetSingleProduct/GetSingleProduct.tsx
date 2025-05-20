import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GetSingleProduct.css';
import { useParams } from 'react-router-dom';
import { getSingleProductThunk } from '../../redux/products';
import { RootState } from '../../redux/store';
import OpenModalButton from '../OpenModalButton';
import ReviewFormModal from '../AllProducts/ReviewFormModal/ReviewFormModal';



const GetSingleProduct = (): JSX.Element => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();

    const product = useSelector((state: RootState) => state.products.byId[Number(id)]);

    useEffect(() => {
        const singleProduct = async () => {
            await dispatch(getSingleProductThunk(Number(id)));
            setIsLoaded(true);
        };

        if (!isLoaded) {
            singleProduct();
        }
    }, [isLoaded, dispatch, id]);

    if (!isLoaded) {
        return <h1>Loading...</h1>;
    }

    return (

        <div>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <p>⭐️{product.avg_rating}</p>
            <div>
                <img src={product.product_images[0].url} />
            </div>
            <NavLink to={`/products/${Number(id)}/update`}>
                Update a Product
            </NavLink>
        
            <OpenModalButton
                buttonText="Write a review"
                modalComponent={<ReviewFormModal productId={product.Id} />}
            />
        </div>
        
    );
};

export default GetSingleProduct;
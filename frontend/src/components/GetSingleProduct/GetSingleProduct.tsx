import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './GetSingleProduct.css';
import { useParams } from 'react-router-dom';
import { getSingleProductThunk } from '../../redux/products';
import { RootState } from '../../redux/store';
import DeleteProductModal from '../DeleteProductModal';
import OpenModalButton from '../OpenModalButton';


const GetSingleProduct = (): JSX.Element => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();

    const product = useSelector((state: RootState) => state.products.byId[Number(id)]);
    const currentUser = useSelector((state: RootState) => state.session.user);

    useEffect(() => {
        const singleProduct = async () => {
            await dispatch(getSingleProductThunk(Number(id)));
            setIsLoaded(true);
        };

        if (!isLoaded) {
            singleProduct();
        }
    }, [isLoaded, dispatch, id]);

    if (!isLoaded || !product) {
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

            {currentUser?.id === product.user_id && (
                <>
            <NavLink to={`/products/${Number(id)}/update`}>
                Update a Product
            </NavLink>
                <OpenModalButton
                    buttonText="Delete"
                    buttonClassName="delete-btn"
                modalComponent={<DeleteProductModal productId={Number(id)}/>}

                />
                    </>
            )}

        </div>

    );
};

export default GetSingleProduct;

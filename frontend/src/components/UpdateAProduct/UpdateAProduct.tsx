import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppSelector, RootState } from "../../redux/store";
import { updateAProductThunk } from "../../redux/products";
import { IProduct, IProductImage } from "../../redux/types/products";
import './UpdateAProduct.css'

interface IUpdateErrors {
    name?: string;
    description?: string;
    price?: string;
    item_count?: string;
    product_images?: string;
}

function UpdateAProduct() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const sessionUser = useAppSelector((state) => state.session.user);
    const product = useSelector((state: RootState) => state.products.byId[Number(id)]) as IProduct;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [item_count, setItemCount] = useState(0);
    // const [product_images, setProductImages] = useState<string[]>([]);
    const [product_images, setProductImages] = useState<IProductImage[]>([]);

    useEffect(() => {

        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setItemCount(product.item_count);
            setProductImages(product.product_images ?? []);
        }
    }, [product]);

    const [errors, setErrors] = useState<IUpdateErrors>({
        name: "",
        description: "",
        price: "",
        item_count: "",
        product_images: ""
    });

    if (!sessionUser) return <Navigate to="/" replace={true} />;


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            updateAProductThunk(Number(id), {
                name,
                description,
                price,
                item_count,
                product_images
            })
        );

        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            navigate(`/products/${Number(id)}`);
        }
    };

    if (!product){
        return <div>Loading product details...</div>
    }

    return (
        <div className="update-container">
            <h2 id='update-title'>Update a Product</h2>

            <form className= "image-container" onSubmit={handleSubmit}>
                <label className='update-input'>
                    Product Name
                    <input className="input-container"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {errors.name && <p>{errors.name}</p>}
                <label className='update-input'>
                    Description
                    <input className="input-container"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p>{errors.description}</p>}
                <label className='update-input'>
                    Price
                    <input className="input-container"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.price && <p>{errors.price}</p>}
                <label className='update-input'>
                    Total Number of Items
                    <input className="input-container"
                        type="number"
                        value={item_count}
                        onChange={(e) => setItemCount(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.item_count && <p>{errors.item_count}</p>}
                <label className='update-input'>
                    Preview Product Image
                    <input className="input-container"
                        type="text"
                        value={product_images[0]?.url}
                        onChange={(e) => {
                            const preview_img: IProductImage = {
                                url: e.target.value,
                                preview: false
                            };
                            let image_array = [preview_img];
                            for (let i = 1; i < product_images.length; i++) {
                                image_array.push(product_images[i]);
                            }
                            setProductImages(image_array);
                        }}
                        required
                    />
                </label>
                {errors.product_images && <p>{errors.product_images}</p>}

                <label className='update-input'>
                    Additional Product Image #1
                    <input className="input-container"
                        type="text"
                        value={product_images[1]?.url}
                        onChange={(e) => {
                            const additional_image: IProductImage = {
                                url: e.target.value,
                                preview: false
                            };

                            let image_array = [product_images[0]];

                            for (let i = 1; i < product_images.length; i++) {
                                image_array.push(product_images[i]);
                            }
                            image_array.push(additional_image)

                            setProductImages(image_array);
                        }}
                    />
                </label>

                <label className='update-input'>
                    Additional Product Image #2
                    <input className="input-container"
                        type="text"
                        value={product_images[2]?.url}
                        onChange={(e) => {
                            const additional_image: IProductImage = {
                                url: e.target.value,
                                preview: false
                            };

                            let image_array = [product_images[0]];

                            for (let i = 1; i < product_images.length; i++) {
                                image_array.push(product_images[i]);
                            }
                            image_array.push(additional_image)

                            setProductImages(image_array);
                        }}
                    />
                </label>

                <label className='update-input'>
                    Additional Product Image #3
                    <input className="input-container"
                        type="text"
                        value={product_images[3]?.url}
                        onChange={(e) => {
                            const additional_image: IProductImage = {
                                url: e.target.value,
                                preview: false
                            };

                            let image_array = [product_images[0]];

                            for (let i = 1; i < product_images.length; i++) {
                                image_array.push(product_images[i]);
                            }
                            image_array.push(additional_image)

                            setProductImages(image_array);
                        }}
                    />
                </label>

                <label className='update-input'>
                    Additional Product Image #4
                    <input className="input-container"
                        type="text"
                        value={product_images[4]?.url}
                        onChange={(e) => {
                            const additional_image: IProductImage = {
                                url: e.target.value,
                                preview: false
                            };

                            let image_array = [product_images[0]];

                            for (let i = 1; i < product_images.length; i++) {
                                image_array.push(product_images[i]);
                            }
                            image_array.push(additional_image)

                            setProductImages(image_array);
                        }}
                    />
                </label>
                <button className="button-container" type="submit">Update Product</button>

                {product_images[0] && (
                    <div>
                    <h2>Preview Image</h2>
                        <img src={product_images[0]?.url} className='update-images'/>
                    </div>
                )}

                {product_images.length > 1 && (
                    <div >
                        <h2>Additional Images</h2>
                        {product_images.slice(1).map((img, idx) => (
                            <div key={idx}>
                                <img src={img?.url} className='update-images'/>
                            </div>
                        ))}
                    </div>
                )}
            </form>
        </div>
    );
}

export default UpdateAProduct;

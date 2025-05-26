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
    // const [product_images, setProductImages] = useState<IProductImage[]>([]);
    const [previewImage, setPreviewImage] = useState({ preview: true, url: '' });
    const [secondImage, setSecondImage] = useState({ preview: false, url: '' });
    const [thirdImage, setThirdImage] = useState({ preview: false, url: '' });
    const [fourthImage, setFourthImage] = useState({ preview: false, url: '' });
    const [fifthImage, setFifthImage] = useState({ preview: false, url: '' });
    const product_images: IProductImage[] = []

    // console.log(product.product_images[0].url)

    useEffect(() => {

        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setItemCount(product.item_count);
            // product_images.push({ url: previewImage.url, preview: true })
            // secondImage.url.length ? product_images.push({ url: secondImage.url, preview: false }) : null
            // thirdImage.url.length ? product_images.push({ url: thirdImage.url, preview: false }) : null
            // fourthImage.url.length ? product_images.push({ url: fourthImage.url, preview: false }) : null
            // fifthImage.url.length ? product_images.push({ url: fifthImage.url, preview: false }) : null
            setPreviewImage({ preview: true, url: product.product_images[0].url })
            setSecondImage({ preview: false, url: product.product_images[1].url })
            setThirdImage({ preview: false, url: product.product_images[2].url })
            setFourthImage({ preview: false, url: product.product_images[3].url })
            setFifthImage({ preview: false, url: product.product_images[4].url })
            // setProductImages(product.product_images ?? []);

        }
    }, [product, product_images]);

    const [errors, setErrors] = useState<IUpdateErrors>({});

    useEffect(() => {
        const newErrors: IUpdateErrors = {};

        if (!name) {
            newErrors.name = "Name is required"
        } else if (name.length < 5) {
            newErrors.name = "Name must be at least 5 characters"
        } else if (name.length > 100) {
            newErrors.name = "Name must be less than 100 characters"
        }

        if (!description) {
            newErrors.description = "Description is required"
        } else if (description.length < 10) {
            newErrors.description = "Description must be at least 10 characters"
        } else if (description.length > 1000) {
            newErrors.description = "Description must be less than 1000 characters"
        }

        if (!price) {
            newErrors.price = "Price is required"
        } else if (price < 0.01) {
            newErrors.price = "Price must be at least $0.01"
        } else if (price > 10000) {
            newErrors.price = "Price must be less than $10,000"
        }

        if (!item_count) {
            newErrors.item_count = "Item count is required";
        } else if (item_count < 1) {
            newErrors.item_count = "Item count must be at least 1"
        } else if (item_count > 10000) {
            newErrors.item_count = "Item count must be less than 10,000"
        }

        if (
            !product_images ||
            product_images.length === 0 ||
            !product_images[0]?.url
        ) {
            newErrors.product_images = "Preview Image is required";
        }

        setErrors(newErrors)
    }, [name, description, price, item_count])

    if (!sessionUser) return <Navigate to="/" replace={true} />;


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        product_images.push({ url: previewImage.url, preview: true })
        secondImage.url.length ? product_images.push({ url: secondImage.url, preview: false }) : null
        thirdImage.url.length ? product_images.push({ url: thirdImage.url, preview: false }) : null
        fourthImage.url.length ? product_images.push({ url: fourthImage.url, preview: false }) : null
        fifthImage.url.length ? product_images.push({ url: fifthImage.url, preview: false }) : null

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

    if (!product) {
        return <div>Loading product details...</div>
    }

    return (
        <div className="update-container">
            <h2 id='update-title'>Update a Product</h2>

            <form className="image-container" onSubmit={handleSubmit}>
                <label className='update-input'>
                    Product Name
                    <input className="input-container"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {errors.name && <p className="error-message">{errors.name}</p>}
                <label className='update-input'>
                    Description
                    <input className="input-container"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p className="error-message">{errors.description}</p>}
                <label className='update-input'>
                    Price
                    <input className="input-container"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.price && <p className="error-message">{errors.price}</p>}
                <label className='update-input'>
                    Total Number of Items
                    <input className="input-container"
                        type="number"
                        value={item_count}
                        onChange={(e) => setItemCount(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.item_count && <p className="error-message">{errors.item_count}</p>}
                {/* <label className='update-input'>
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
                {errors.product_images && <p className="error-message">{errors.product_images}</p>}

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
                        <img src={product_images[0]?.url} className='update-images' />
                    </div>
                )}

                {product_images.length > 1 && (
                    <div >
                        <h2>Additional Images</h2>
                        {product_images.slice(1).map((img, idx) => (
                            <div key={idx}>
                                <img src={img?.url} className='update-images' />
                            </div>
                        ))}
                    </div>
                )} */}
                 <label className='create-input'>
                    Preview Product Image
                    <input className='input-container' placeholder="Preview Image URL" onChange={(e) => {
                        setPreviewImage({ preview: true, url: e.target.value })
                        // e.target.value.length ? setPreviewDisabled(false) : setPreviewDisabled(true)
                    }}
                        value={previewImage.url}
                        required
                    />
                </label>
                {errors.product_images && <p className="error-message">{errors.product_images}</p>}
                <label className='create-input'>
                    Image #2
                    <input className='input-container' placeholder="Image URL" onChange={(e) => {
                        setSecondImage({ preview: false, url: e.target.value })
                    }}
                        value={secondImage.url}
                        required
                    />
                </label>
                <label className='create-input'>
                    Image #3
                    <input className='input-container' placeholder="Image URL" onChange={(e) => {
                        setThirdImage({ preview: false, url: e.target.value })
                    }}
                        value={thirdImage.url}
                        required
                    />
                </label>
                <label className='create-input'>
                    Image #4
                    <input className='input-container' placeholder="Image URL" onChange={(e) => {
                        setFourthImage({ preview: false, url: e.target.value })
                    }}
                        value={fourthImage.url}
                        required
                    />
                </label>
                <label className='create-input'>
                    Image #5
                    <input className='input-container' placeholder="Image URL" onChange={(e) => {
                        setFifthImage({ preview: false, url: e.target.value })
                    }}
                        value={fifthImage.url}
                        required
                    />
                </label>

                {[previewImage, secondImage, thirdImage, fourthImage, fifthImage].map((image, i) => {
                    return (
                        <div key={`${image.url}-${i}`}>
                            <b>{image.url.length ? image.preview == true ? 'Preview Image' : `Image #${i + 1}` : ''}</b>
                            {image.url.length ? <img src={image.url} className="create-images"></img> : ''}
                            <hr className="create-line"></hr>
                        </div>
                    )
                })}


            </form>
        </div>
    );
}

export default UpdateAProduct;

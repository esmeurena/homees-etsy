import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { createProductThunk } from "../../redux/products";
import './CreateProduct.css';
import { useRef } from 'react';
import { IProductImage } from "../../redux/types/products";

interface ICreateImageErrors {
    name?: string;
    description?: string;
    price?: string;
    item_count?: string;
    product_images?: string;
}

function CreateProductPage() {
    const counter = useRef(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useAppSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [item_count, setItemCount] = useState(0);
    const [product_images, setProductImages] = useState<IProductImage[]>([]);
    // const [product_images, setProductImages] = useState([]);
    // const [product_images, setProductImages] = useState<string[]>([]);
    // const [additionalImage, setAdditionalImage] = useState("");//placeholder for urls

    const [errors, setErrors] = useState<ICreateImageErrors>({});

    useEffect(() => {
        const newErrors: ICreateImageErrors = {};

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

        if (!product_images || product_images.length === 0) {
            newErrors.product_images = "Preview Image is required"
        }

        setErrors(newErrors)
    }, [name, description, price, item_count, product_images])
    if (!sessionUser) return <Navigate to="/" replace={true} />;


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const serverResponse = await dispatch(
            createProductThunk({
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
            navigate("/");
        }
    };
    const fillValues = () => {
        const count = counter.current;
        setName("Product" + count);
        setDescription("Long Description" + count);
        setPrice(count);
        setItemCount(count);
        setProductImages([{
            url: "https://cd2.boardgamesmaker.com/AttachFiles/WebsiteImages/Product_Show/FI_8807.jpg",
            preview: true,
            product_id: 0,
        }, {
            url: "https://www.collinsdictionary.com/images/full/dice_393025615_1000.jpg",
            preview: false,
            product_id: 0,
        }, {
            url: "https://farm3.staticflickr.com/2573/4144840299_f44aed6ce5_z.jpg",
            preview: false,
            product_id: 0,
        }, {
            url: "https://www.gastonsanchez.com/intro2cwd/images/simulation/dice4.jpg",
            preview: false,
            product_id: 0,
        }, {
            url: "https://store.foxtrot.com/cdn/shop/products/mathydice-frontpage.png?v=1652387248",
            preview: false,
            product_id: 0,
        }
        ]);

        counter.current += 1;
    };

    return (
        <div className="create-container">
            <button type="button" onClick={fillValues} id='create-auto-fill'>AUTO-FILL</button>
            <h2 id='create-title'>Create a Product</h2>

            <form className= "image-container" onSubmit={handleSubmit}>
                <label className='create-input'>
                    Product Name
                    <input className="input-container"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {errors.name && <p>{errors.name}</p>}
                <label className='create-input'>
                    Description
                    <input className="input-container"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p>{errors.description}</p>}
                <label className='create-input'>
                    Price
                    <input className="input-container"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.price && <p>{errors.price}</p>}
                <label className='create-input'>
                    Total Number of Items
                    <input className="input-container"
                        type="number"
                        value={item_count}
                        onChange={(e) => setItemCount(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.item_count && <p>{errors.item_count}</p>}
                <label className='create-input'>
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

                <label className='create-input'>
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

                <label className='create-input'>
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

                <label className='create-input'>
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

                <label className='create-input'>
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

                {/* <label>
                    Additional Image
                    <input
                        type="text"
                        value={additionalImage}
                        onChange={(e) => setAdditionalImage(e.target.value)}
                    />
                    <button type="button"
                        onClick={() => {
                            if (additionalImage) {
                                const adding_an_image = [];
                                //we need to re-save the images again every time
                                for (let i = 0; i < product_images.length; i++) {
                                    adding_an_image.push(product_images[i]);
                                }
                                adding_an_image.push(additionalImage);
                                setProductImages(adding_an_image);
                            }
                        }}
                    >Add this image</button>
                </label> */}
                {/* {errors.additionalImage && <p>{errors.additionalImage}</p>} */}
                <button className="button-container" type="submit">Create Product</button>
            </form>

            {product_images[0] && (
                <div className='create-images'>
                    <p>Preview Image</p>
                    <img src={product_images[0]?.url} />
                </div>
            )}

            {product_images.length > 1 && (
                <div className='create-images'>
                    <p>Additional Images</p>
                    {product_images.slice(1).map((img, idx) => (
                        <div key={idx}>
                            <img src={img?.url} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CreateProductPage;

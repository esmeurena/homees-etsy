import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import { createProductThunk } from "../../redux/products";
import './CreateProduct.css';
import { useRef } from 'react';

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

    // const [product_images, setProductImages] = useState([]);
    const [product_images, setProductImages] = useState<string[]>([]);
    const [additionalImage, setAdditionalImage] = useState("");//placeholder for urls

    const [errors, setErrors] = useState<ICreateImageErrors>({
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
        setName("ProductName" + count);
        setDescription("Very Long Description" + count);
        setPrice(count);
        setItemCount(count);
        setProductImages(["https://upload.wikimedia.org/wikipedia/commons/1/1c/6sided_dice_%28cropped%29.jpg"]);

        counter.current += 1;
    };

    return (
        <>
            <button type="button" onClick={fillValues}>AUTO-FILL</button>
            <h1>Create a Product</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Product Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                {errors.name && <p>{errors.name}</p>}
                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                {errors.description && <p>{errors.description}</p>}
                <label>
                    Price
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.price && <p>{errors.price}</p>}
                <label>
                    Total Number of Items
                    <input
                        type="number"
                        value={item_count}
                        onChange={(e) => setItemCount(Number(e.target.value))}
                        required
                    />
                </label>
                {errors.item_count && <p>{errors.item_count}</p>}
                <label>
                    Preview Product Image
                    <input
                        type="text"
                        value={product_images[0]}
                        onChange={(e) => {
                            const preview_img = e.target.value;
                            let image_array = [preview_img];
                            //will work for both update and create
                            for (let i = 1; i < product_images.length; i++) {
                                image_array.push(product_images[i]);
                            }
                            setProductImages(image_array);
                        }}
                        required
                    />
                </label>
                {errors.product_images && <p>{errors.product_images}</p>}

                <label>
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
                </label>
                {/* {errors.additionalImage && <p>{errors.additionalImage}</p>} */}
                <button type="submit">Create Product</button>
            </form>

            {product_images[0] && (
                <div>
                    <p>Preview Image</p>
                    <img src={product_images[0]} />
                </div>
            )}

            {product_images.length > 1 && (
                <div>
                    <p>Additional Images</p>
                    {product_images.slice(1).map((img, idx) => (
                        <div key={idx}>
                            <img src={img} />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default CreateProductPage;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppSelector, RootState } from "../../redux/store";
import { updateAProductThunk } from "../../redux/products";

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
    const product = useSelector((state: RootState) => state.products.byId[Number(id)]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [item_count, setItemCount] = useState(0);
    // const [product_images, setProductImages] = useState([]);
    const [product_images, setProductImages] = useState<string[]>([]);
    // const [moreImages, setMoreImages] = useState("");

    useEffect(() => {

        if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setItemCount(product.item_count);
            setProductImages([product.product_images[0].url]);
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
            navigate("/products/${id}");
        }
    };

    if (!product){
        return <div>Loading product details...</div>
    }

    return (
        <>
            <h1>Update a Product</h1>

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
                        value={product_images.length > 0 ? product_images[0] : ''}
                        onChange={(e) => setProductImages([e.target.value])}
                        required
                    />
                </label>
                {errors.product_images && <p>{errors.product_images}</p>}
                <button type="submit">Update Product</button>
            </form>
        </>
    );
}

export default UpdateAProduct;

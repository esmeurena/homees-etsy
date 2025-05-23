import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteItemFromShoppingCartThunk, getAllShoppingCartItemsThunk } from "../../redux/shopping_cart";
import { useNavigate } from "react-router-dom";

function ShoppingCartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const shoppingCart: IShoppingCartItem[] = useSelector((state: RootState) => state.shopping_cart.shopping_cart_items);
    const shoppingCart = useSelector((state: RootState) => state.shopping_cart.allShoppingCartItems);
    useEffect(() => {
        dispatch(getAllShoppingCartItemsThunk());
    }, [dispatch]);

    const handleClickDelete = async (e: React.MouseEvent<HTMLButtonElement>, productId: number) => {
        e.preventDefault();
        await dispatch(deleteItemFromShoppingCartThunk(productId));

        navigate("/shoppingcart")
    };

    return (
        <div>
            <h1>Shopping Cart</h1>

            {
                (() => {
                    if (shoppingCart.length === 0) {
                        return <p>Your Shopping cart is empty!!</p>;
                    }
                    const shopping_cart_items = [];

                    for (let i = 0; i < shoppingCart.length; i++) {
                        const indiv_item = shoppingCart[i];

                        shopping_cart_items.push(

                            <div key={indiv_item.id} >

                                <p>{indiv_item.product?.name} </p>

                                <p> Item Count: {indiv_item.item_count} </p>
                                {indiv_item.product?.product_images?.length && (
                                    <img src={indiv_item.product?.product_images[0]?.url} width="350" />
                                )}
                                <button onClick={(e) => handleClickDelete(e, indiv_item.id)} className="delete-review-button">
                                    Delete Product
                                </button>
                            </div>

                        );
                    }

                    return shopping_cart_items;
                })()
            }
        </div>
    );

}

export default ShoppingCartPage;
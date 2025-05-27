import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../redux/store";
import { deleteItemFromShoppingCartThunk, getAllShoppingCartItemsThunk } from "../../redux/shopping_cart";
import { useNavigate } from "react-router-dom";
import './ShoppingCartPage.css';

function ShoppingCartPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sessionUser = useAppSelector((state) => state.session.user);
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

    const handleCompletePurchase = () => {
        navigate("/transaction")
    };

    return (
        <div className="shopping-container">
            <h1>Shopping Cart</h1>

            {
                (() => {
                    if (!sessionUser) {
                        return <h2>Log in to add to your shopping cart!!</h2>;
                    }
                    else if (shoppingCart.length === 0) {
                        return <p>Your Shopping cart is empty!!</p>;
                    } else {
                        const shopping_cart_items = [];
                        let total = 0;

                        for (let i = 0; i < shoppingCart.length; i++) {
                            const indiv_item = shoppingCart[i];
                            
                            let price = Number(indiv_item.product?.price) || 0;
                            let itemTotal = Number(price * indiv_item.item_count);
                            total += itemTotal;

                            shopping_cart_items.push(

                                <div className="shopping-item" key={indiv_item.id} >

                                    <div className="shopping-second">
                                        <img className="shopping-image" src={indiv_item.product?.product_images?.[0]?.url} />

                                        <div className="shopping-name-top">
                                            <h3 className="shopping-name">{indiv_item.product?.name} </h3>
                                            {/* <p>★{indiv_item.product?.avg_rating}</p> */}
                                            <p>Free shipping when you spend $7.55 more</p>
                                            <label> Size:
                                                <select className="shopping-size-select"> <option>S</option> <option>M</option> <option>L</option> </select>
                                            </label>
                                        </div>

                                        <div className="fix-price">
                                                <div>${price.toFixed(2)}</div>
                                        </div>
                                    </div>
                                    <div className="shopping-delete">
                                        <p> Item Count: {indiv_item.item_count} </p>

                                        <button onClick={(e) => handleClickDelete(e, indiv_item.id)} className="delete-review-button">
                                            Delete Product
                                        </button>
                                    </div>

                                <hr className="shopping-line" />
                                <p className="shopping-ship-message">Shipping: $5.00 (Get it by May 31-Jun 9)</p>

                                    <div className="complete-purchase">

                                        <button onClick={handleCompletePurchase} className="complete-purchase-button">
                                            Complete Purchase
                                        </button>
                                    </div>
                            </div>

                        );
                    }

                        shopping_cart_items.push(
                            <div className="shopping-total" key="total-price">
                                Total Price: ${total.toFixed(2)}
                            </div>
                        );

                        return shopping_cart_items;
                    }
                })()
            }
        </div>
    );


}

export default ShoppingCartPage;
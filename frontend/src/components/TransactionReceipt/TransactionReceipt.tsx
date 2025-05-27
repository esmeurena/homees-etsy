import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppSelector } from "../../redux/store";
import { getAllShoppingCartItemsThunk } from "../../redux/shopping_cart";
import './TransactionReceipt.css';

function TransactionReceipt() {
    const dispatch = useDispatch();
    const sessionUser = useAppSelector((state) => state.session.user);
    const purchasedItems = useSelector((state: RootState) => state.shopping_cart.allShoppingCartItems);

    useEffect(() => {
        dispatch(getAllShoppingCartItemsThunk());
    }, [dispatch]);

    
    let subtotal = 0;
    purchasedItems.forEach(item => {
        const price = Number(item.product?.price) || 0;
        subtotal += price * item.item_count;
    });

    const shipping = 5.00; 
    const total = subtotal + shipping;

    return (
        <div className="receipt-container">
            <h1>Order Confirmation</h1>
            <p className="order-thank-you">Thank you for your purchase, {sessionUser?.username || 'Customer'}!</p>
            <p className="order-number">Order #ABC-123-XYZ</p> 
            <p className="order-date">Date: {new Date().toLocaleDateString()}</p>

            ---

            <h2>Order Summary</h2>
            <div className="receipt-items">
                {purchasedItems.length === 0 ? (
                    <p>No items found for this order.</p> 
                ) : (
                    purchasedItems.map(item => (
                        <div className="receipt-item" key={item.id}>
                            {/* <img className="receipt-item-image" src={item.product?.product_images?.[0]?.url} alt={item.product?.name} /> */}
                            <div className="receipt-item-details">
                                <p className="receipt-item-name">{item.product?.name}</p>
                                <p className="receipt-item-quantity">Quantity: {item.item_count}</p>
                                <p className="receipt-item-price">${(Number(item.product?.price) || 0).toFixed(2)} each</p>
                            </div>
                            <div className="receipt-item-total">
                                ${(Number(item.product?.price) * item.item_count || 0).toFixed(2)}
                            </div>
                        </div>
                    ))
                )}
            </div>

            ---

            <div className="receipt-summary">
                <div className="receipt-summary-line">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="receipt-summary-line">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="receipt-summary-line receipt-total">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            ---

            <h2>Shipping Information</h2>
            <div className="shipping-info">
                <p><strong>Shipping Address:</strong></p>
                <p>John Doe</p>
                <p>123 Main St</p>
                <p>Anytown, AN 12345</p>
                <p>United States</p>
                <p><strong>Estimated Delivery:</strong> May 31 - Jun 9</p> 
            </div>

            ---

            <h2>Payment Information</h2>
            <div className="payment-info">
                <p>Payment Method: **** **** **** 1234</p> 
                <p>Transaction ID: TXN-5678-ABCD</p> 
            </div>
        </div>
    );
}

export default TransactionReceipt;
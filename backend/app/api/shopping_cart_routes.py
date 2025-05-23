from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db
from app.models import Product, ShoppingCartItem
from datetime import datetime
# from app.models import ShoppingCart  # Uncomment and import your ShoppingCart model
# from app.forms import

shopping_cart_routes = Blueprint('shopping_carts', __name__)

# Get All Shopping Cart Items Route
@shopping_cart_routes.route('/')
@login_required
def get_all_shopping_cart_items():
    # all_cart_items = [shopping_cart_item for shopping_cart_item in ShoppingCartItem.query.all()]
    user_id = current_user.id
    all_cart_items = db.session.query(ShoppingCartItem).filter_by(user_id=user_id).all()
    
    return jsonify({"shopping_carts": [individual_item.to_dict() for individual_item in all_cart_items]})
    # return jsonify([individual_item.to_dict() for individual_item in all_cart_items])

# Get Single Shopping Cart Item Route
@shopping_cart_routes.route('/<int:id>')
def get_shoppingcart(id):
    pass

@shopping_cart_routes.route('/', methods=['POST'])
@login_required
def add_shopping_cart_item():
    data = request.get_json()
    product_id = data.get("product_id")
    user_id = current_user.id

    shopping_cart_item = ShoppingCartItem(
        user_id=user_id,
        product_id=product_id,
        item_count=1,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.session.add(shopping_cart_item)
    db.session.commit()

    return {"message": "Product added to Shopping Cart"}, 201

# Update a Shopping Cart Item Route
@shopping_cart_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_shoppingcart(id):
    pass

# Delete a Shopping Cart Item Route
@shopping_cart_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_shopping_cart_item(id):
    shopping_cart_item = ShoppingCartItem.query.get(id)

    db.session.delete(shopping_cart_item)
    db.session.commit()

    return {"message": "Shopping Cart Item removed"}

@shopping_cart_routes.route('/transaction', methods=['POST'])
@login_required
def transaction_in_shopping_cart():
    pass

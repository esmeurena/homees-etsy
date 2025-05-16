from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db
# from app.models import ShoppingCart  # Uncomment and import your ShoppingCart model
# from app.forms import

shopping_cart_routes = Blueprint('shopping_carts', __name__)

# Get All Shopping Cart Items Route
@shopping_cart_routes.route('/')
def get_all_shoppingcart():
    pass

# Get Single Shopping Cart Item Route
@shopping_cart_routes.route('/<int:id>')
def get_shoppingcart(id):
    pass

# Create a Shopping Cart Item Route
@shopping_cart_routes.route('/create', methods=['POST'])
@login_required
def create_shoppingcart():
    pass

# Update a Shopping Cart Item Route
@shopping_cart_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_shoppingcart(id):
    pass

# Delete a Shopping Cart Item Route
@shopping_cart_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_shoppingcart(id):
    pass

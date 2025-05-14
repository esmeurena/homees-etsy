from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
# import whatever the Product Images model class name is below
from app.models import db
# from app.models import ProductImage
# from app.forms import

productimages_routes = Blueprint('productimages', __name__)

# Get All Product Images Route
@productimages_routes.route('/')
def get_all_productimages():
    pass

# Get Single Product Image Route
@productimages_routes.route('/<int:id>')
def get_productimage(id):
    pass

# Create a Product Image Route
@productimages_routes.route('/create', methods=['POST'])
@login_required
def create_productimage():
    pass

# Update a Product Image Route
@productimages_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_productimage(id):
    pass

# Delete a Product Image Route
@productimages_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_productimage(id):
    pass

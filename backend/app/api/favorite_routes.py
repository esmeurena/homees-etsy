from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
# import whatever the Review model class name is below
from app.models import db, Favorite, Product
# import the review form class
# from app.forms import

favorite_routes = Blueprint('favorites', __name__)

# Get All Favorites for Current User
@favorite_routes.route('/')
@login_required
def get_all_favorites():
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    favorite_products = [Product.query.get(fav.product_id) for fav in favorites]
    return [product.to_dict() for product in favorite_products if product]


# Add a Favorite
@favorite_routes.route('/add', methods=['POST'])
@login_required
def add_favorite():
    pass


# Remove a Favorite
@favorite_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def remove_favorite(product_id):
    pass

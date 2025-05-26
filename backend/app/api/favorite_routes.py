from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Favorite, Product
import datetime

favorite_routes = Blueprint('favorites', __name__)

# Get All Favorites for Current User
@favorite_routes.route('/')
@login_required
def get_all_favorites():
    favorites = Favorite.query.filter_by(user_id=current_user.id).all()
    # favorite_products = [Product.query.get(fav.product_id) for fav in favorites]
    return jsonify({"favorites": [product.to_dict() for product in favorites]})


# Add a Favorite
@favorite_routes.route('/', methods=['POST'])
@login_required
def add_favorite_product():
    data = request.get_json()
    product_id = data.get("product_id")
    user_id = current_user.id
    single_product = Product.query.get(product_id)

    favorite_product = Favorite(
        user_id=user_id,
        product_id=product_id,
        products= single_product
    )

    db.session.add(favorite_product)
    db.session.commit()

    return favorite_product.to_dict(), 201

    # return {"message": "Product added to Favorites"}, 201


# Remove a Favorite
@favorite_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def remove_favorite(product_id):
    pass

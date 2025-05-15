from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
# import whatever the Review model class name is below
from app.models import db
# import the review form class
# from app.forms import

favorite_routes = Blueprint('favorites', __name__)

# Get All Favorites for Current User
@favorite_routes.route('/')
@login_required
def get_all_favorites():
    pass


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

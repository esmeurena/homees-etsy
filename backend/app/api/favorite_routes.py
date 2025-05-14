from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
# import whatever the Review model class name is below
from app.models import db
# import the review form class
# from app.forms import

favorites_routes = Blueprint('favorites', __name__)

# Get All Favorites for Current User
@favorites_routes.route('/')
@login_required
def get_all_favorites():
    pass


# Add a Favorite
@favorites_routes.route('/add', methods=['POST'])
@login_required
def add_favorite():
    pass


# Remove a Favorite
@favorites_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def remove_favorite(product_id):
    pass

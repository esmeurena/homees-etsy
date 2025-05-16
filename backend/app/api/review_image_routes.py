from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
# import whatever the review_image model class name is below
from app.models import db
# import the review_image form class
# from app.forms import

review_image_routes = Blueprint('review_images', __name__)

# Get all Review Images Route
@review_image_routes.route('/')
def get_all_review_images():
    pass

# Get Single Review Image Route
@review_image_routes.route('/<int:id>')
def get_review_image(id):
    pass

# Create a Review Image Route
@review_image_routes.route('/create', methods=['POST'])
@login_required
def create_review_image():
    pass

# Update a Review Image Route
@review_image_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review_image(id):
    pass

# Delete a Review Image Route
@review_image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review_image(id):
    pass

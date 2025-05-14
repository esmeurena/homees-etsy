from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
# import whatever the Review model class name is below
from app.models import db
# import the review form class
# from app.forms import

review_routes = Blueprint('reviews', __name__)

# Get All Reviews Route
@review_routes.route('/')
def get_all_reviews():
    pass


# Get Single Review Route
@review_routes.route('/<int:id>')
def get_review(id):
    pass


# Create a Review Route
@review_routes.route('/create', methods=['POST'])
@login_required
def create_review():
    pass


# Update a Review Route
@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    pass


# Delete a Review Route
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    pass

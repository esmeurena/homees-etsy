from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
# import whatever the Review model class name is below
from app.models import Review
from app.models import db
# import the review form class
# from app.forms import

review_routes = Blueprint('reviews', __name__)

# Get All Reviews Route
@review_routes.route('/products/<int:id>')
def get_all_reviews(id):
    all_reviews = [
        review.to_dict() for review in Review.query.filter(
            Review.product_id == id
            )]

    return all_reviews

# Get Single Review Route
@review_routes.route('/<int:id>')
def get_review(id):
    single_review = Review.query.get(id)
    return single_review.to_dict()


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

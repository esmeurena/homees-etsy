from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
# import whatever the Review model class name is below
from app.models import Review, Product
from app.models import db
from app.forms import ReviewForm
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

    return {"Reviews": all_reviews}

# Get Single Review Route
@review_routes.route('/<int:id>')
def get_review(id):

    review = Review.query.get(id)
    
    if review:
        return review.to_dict(), 200
    
    return {"message": "Review was not found", "statusCode": 404}, 404



# Create a Review Route
@review_routes.route('/create', methods=['POST'])
@login_required
def create_review():

    data = request.json
    product_id = data.get('product_id')

    if not product_id:
        return {"message": "product id is required", "statusCode": 400}, 400

    product = Product.query.get(product_id)
    if not product:
        return {"message": "Product was not found", "statusCode": 404}, 404


    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    
    if form.validate_on_submit():
        
        new_review = Review(
            product_id = product_id,
            user_id = current_user.id,
            review = form.data['review'],
            stars= form.data['stars']
        )
        db.session.add(new_review)
        db.session.commit()

        review = Review.query.get(new_review.id)
        return review.to_dict(), 201

    return {"errors": form.errors, "statusCode": 400}, 400
# Update a Review Route
@review_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_review(id):
    pass


# Delete a Review Route
@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)

    if review:
        if review.user_id == current_user.id:
            db.session.delete(review)
            db.session.commit()
            return {'message': 'Deleted'}, 200
    else:
        return {'error': 'Forbidden'}, 403
    return {'error': 'Review not found'}, 404

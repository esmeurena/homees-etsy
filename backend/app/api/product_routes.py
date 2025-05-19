from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.forms import ProductForm
from app.models import db, Product, User
from datetime import datetime
# import the product form class
# from app.forms import

product_routes = Blueprint('products', __name__)

# Get All Products Route
@product_routes.route('/')
def get_all_products():
    products = []
    all_products = [product.to_dict() for product in Product.query.all()]

    for product in all_products:
        user = User.query.get(product['user_id'])
        products.append(user)

    users = [user.to_dict() for user in products]

    for i in range(len(users)):
        all_products[i]['User'] = users[i]

    return {'Products': all_products}


# Get Single Product Route
@product_routes.route('/<int:id>')
def get_single_product(id):
    single_product = Product.query.get(id)
    return single_product.to_dict()


# Create a Product Route
@product_routes.route('/create', methods=['POST'])
@login_required


def create_product():
    form = ProductForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        data = form.data
        product_form = Product (
            user_id = current_user.id,
            name = data['name'],
            description = data['description'],
            price = data['price'],
            item_count = data['item_count'],
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        db.session.add(product_form)
        db.session.commit()
        return product_form.to_dict(), 201

    return form.errors, 401


# Update a Product Route
@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    pass


# Delete a Product Route
@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    product = Product.query.get(id)

    if not product:
        return {"error": "Product not found"}, 404

    if product.user_id != current_user.id:
        return {"error": "Unauthorized"}, 403

    db.session.delete(product)
    db.session.commit()
    return {"message": "Product deleted successfully"}, 200

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Product, User
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
    form = NewProduct()  #****  NewProduct should match the form name in the front end   ******

    if form.validate_on_submit():
        data = form.data
        new_product = {
            'name' : data['name'],
            'description' : data['description'],
            'price' : data['price']
        }

        db.session.add(new_product)
        db.session.commit()

    else:
        return "Bad data"


# Update a Product Route
@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    pass


# Delete a Product Route
@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    pass

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
# import whatever the Product model class name is below
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
        user = User.query.get(product['ownerid'])
        products.append(user)
    
    users = [user.to_dict() for user in products]

    for i in range(len(users)):
        all_products[i]['User'] = users[i]

    return {'Products': all_products}


# Get Single Product Route
@product_routes.route('/<int:id>')
def get_product(id):
    pass


# Create a Product Route
@product_routes.route('/create', methods=['POST'])
@login_required
def create_product():
    data = data.get_json()
    new_product = {
        'id' : len(id) + 1,
        'name' : data['name'],
        'description' : data['description'],
        'price' : data['price']
    }

    products.append(new_product)

    return jsonify({'message': 'Product created successfully', 'item': new_product }), 201

    if __name__ == '__main__':
        app.run(debug=True)


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
from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db
# from app.models import Transaction form class
# from app.forms import

transaction_routes = Blueprint('transactions', __name__)

# Get All Transactions Route
@transaction_routes.route('/')
def get_all_transactions():
    pass

# Get Single Transaction Route
@transaction_routes.route('/<int:id>')
def get_transaction(id):
    pass

# Create a Transaction Route
@transaction_routes.route('/create', methods=['POST'])
@login_required
def create_transaction():
    pass

# Update a Transaction Route
@transaction_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_transaction(id):
    pass

# Delete a Transaction Route
@transaction_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_transaction(id):
    pass

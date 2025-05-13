from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
# import whatever the ReviewImages model class name is below
from app.models import db
# import the reviewimages form class
# from app.forms import

reviewimages_routes = Blueprint('reviewimages', __name__)

# Get all Review Images Route
@reviewimages_routes.route('/')
def get_all_reviewimages():
    pass

# Get Single Review Image Route
@reviewimages_routes.route('/<int:id>')
def get_reviewimage(id):
    pass

# Create a Review Image Route
@reviewimages_routes.route('/create', methods=['POST'])
@login_required
def create_reviewimage():
    pass

# Update a Review Image Route
@reviewimages_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_reviewimage(id):
    pass

# Delete a Review Image Route
@reviewimages_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_reviewimage(id):
    pass

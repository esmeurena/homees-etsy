from flask.cli import AppGroup
from .users import seed_users, undo_users
from .transactions import seed_transactions, undo_transactions
from .shoppingCarts import seed_shopping_carts, undo_shopping_carts
from .reviews import seed_reviews, undo_reviews
from .reviewImages import seed_review_images, undo_review_images
from .products import seed_products, undo_products
from .productImages import seed_product_images, undo_product_images
from .favorites import seed_favorites, undo_favorites

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_transactions()
        undo_shopping_carts()
        undo_reviews()
        undo_review_images()
        undo_products()
        undo_product_images()
        undo_favorites()
        
    seed_users()
    # Add other seed functions here
    seed_transactions()
    seed_shopping_carts()
    seed_reviews()
    seed_review_images()
    seed_products()
    seed_product_images()
    seed_favorites()

# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_users()
    # Add other undo functions here

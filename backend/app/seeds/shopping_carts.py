from app.models import db, ShoppingCart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shopping_carts():
    shopping_cart_1 = ShoppingCart(product_id=1, user_id=1)
    shopping_cart_2 = ShoppingCart(product_id=2, user_id=2)
    shopping_cart_3 = ShoppingCart(product_id=3, user_id=3)
    shopping_cart_4 = ShoppingCart(product_id=4, user_id=4)
    shopping_cart_5 = ShoppingCart(product_id=5, user_id=5)

    db.session.add(shopping_cart_1)
    db.session.add(shopping_cart_2)
    db.session.add(shopping_cart_3)
    db.session.add(shopping_cart_4)
    db.session.add(shopping_cart_5)
    db.session.commit()

def undo_shopping_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_carts"))
    db.session.commit()

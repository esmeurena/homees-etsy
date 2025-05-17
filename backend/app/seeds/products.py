from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    product_1 = Product(user_id=1, name='Product Name 1', price=5.10,
                        description='a description of the first product',
                        item_count=5)
    product_2 = Product(user_id=2, name='Product Name 2', price=10.50,
                        description='a description of the second product',
                        item_count=10)
    product_3 = Product(user_id=3, name='Product Name 3', price=15.75,
                        description='a description of the third product',
                        item_count=15)
    product_4 = Product(user_id=4, name='Product Name 4', price=20.25,
                        description='a description of the fourth product',
                        item_count=20)
    product_5 = Product(user_id=5, name='Product Name 5', price=25.15,
                        description='a description of the fifth product',
                        item_count=25)

    db.session.add(product_1)
    db.session.add(product_2)
    db.session.add(product_3)
    db.session.add(product_4)
    db.session.add(product_5)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;"
            )
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()

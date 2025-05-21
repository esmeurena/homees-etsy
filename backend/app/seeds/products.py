from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    product_1 = Product(user_id=1, name='Product Name 1',                       
                        description='a description of the first product',
                        price= 11.11, item_count=5)
    product_2 = Product(user_id=2, name='Product Name 2',
                        description='a description of the second product',
                        price= 22.22, item_count=10)
    product_3 = Product(user_id=3, name='Product Name 3',
                        description='a description of the third product',
                        price= 33.33, item_count=15)
    product_4 = Product(user_id=4, name='Product Name 4',
                        description='a description of the fourth product',
                        price= 44.44, item_count=20)
    product_5 = Product(user_id=5, name='Product Name 5',
                        description='a description of the fifth product',
                        price= 55.55, item_count=25)

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

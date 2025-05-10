from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    product_1 = Product(ownerId=1, name='name_1', price=5,
                        description='a description')
    product_2 = Product(ownerId=2, name='name_2', price=10,
                        description='a description')
    product_3 = Product(ownerId=3, name='name_3', price=15,
                        description='a description')
    product_4 = Product(ownerId=4, name='name_4', price=20,
                        description='a description')
    product_5 = Product(ownerId=5, name='name_5', price=25,
                        description='a description')

    db.session.add(product_1)
    db.session.add(product_2)
    db.session.add(product_3)
    db.session.add(product_4)
    db.session.add(product_5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()

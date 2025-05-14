from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    product_1 = Product(owner_id=1, name='name_1', price=5,
                        description='a description', item_count='5')
    product_2 = Product(owner_id=2, name='name_2', price=10,
                        description='a description', item_count='10')
    product_3 = Product(owner_id=3, name='name_3', price=15,
                        description='a description', item_count='15')
    product_4 = Product(owner_id=4, name='name_4', price=20,
                        description='a description', item_count='20')
    product_5 = Product(owner_id=5, name='name_5', price=25,
                        description='a description', item_count='25')

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

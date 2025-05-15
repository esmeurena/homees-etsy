from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    user_1 = User(first_name="firstname1", last_name="lastname1", address="123 first st", city="New York", state="New York",country="United States", username="demo", email="demo@aa.io", password="password")
    user_2 = User(first_name="firstname2", last_name="lastname2", address="456 second st", city="Los Angeles", state="California",country="United States", username="marnie", email="marnie@aa.io", password="password")
    user_3 = User(first_name="firstname3", last_name="lastname3", address="789 third st", city="San Diego", state="California",country="United States", username="joe_doe", email="joe@aa.io", password="password")
    user_4 = User(first_name="firstname4", last_name="lastname4", address="234 fourth st", city="Seattle", state="Washington",country="United States", username="username4", email="user4@aa.io", password="password")
    user_5 = User(first_name="firstname5", last_name="lastname5", address="567 five st", city="Denver", state="Colorado",country="United States", username="username5", email="user5@aa.io", password="password")

    db.session.add(user_1)
    db.session.add(user_2)
    db.session.add(user_3)
    db.session.add(user_4)
    db.session.add(user_5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()

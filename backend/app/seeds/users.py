from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo_user = User(first_name="Harold", last_name="Pedraza", address="123 first st", city="New York", state="New York",country="United States", username="demo", email="demo@aa.io", password="password")
    marnie = User(first_name="Oscar", last_name="Page", address="456 second st", city="Los Angeles", state="California",country="United States", username="marnie", email="marnie@aa.io", password="password")
    joe_doe = User(first_name="Esme", last_name="Urena", address="789 third st", city="San Diego", state="California",country="United States", username="joe_doe", email="joe@aa.io", password="password")
    
    db.session.add(demo_user)
    db.session.add(marnie)
    db.session.add(joe_doe)
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

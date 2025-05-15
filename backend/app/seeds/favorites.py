from app.models import db, Favorite, environment, SCHEMA
from sqlalchemy.sql import text

def seed_favorites():
    favorite_1 = Favorite(product_id=1, user_id=1)
    favorite_2 = Favorite(product_id=2, user_id=2)
    favorite_3 = Favorite(product_id=3, user_id=3)
    favorite_4 = Favorite(product_id=4, user_id=4)
    favorite_5 = Favorite(product_id=5, user_id=5)

    db.session.add(favorite_1)
    db.session.add(favorite_2)
    db.session.add(favorite_3)
    db.session.add(favorite_4)
    db.session.add(favorite_5)
    db.session.commit()

def undo_favorites():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorites"))
    db.session.commit()

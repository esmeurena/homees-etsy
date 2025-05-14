from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    review_1 = Review(product_id=1, user_id=1, review='review_1',
                        stars= 1)
    review_2 = Review(product_id=2, user_id=2, review='review_2',
                        stars= 2)
    review_3 = Review(product_id=3, user_id=3, review='review_3',
                        stars= 3)
    review_4 = Review(product_id=4, user_id=4, review='review_04',
                        stars= 4)
    review_5 = Review(product_id=5, user_id=5, review='review_05',
                        stars= 5)

    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.add(review_4)
    db.session.add(review_5)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()

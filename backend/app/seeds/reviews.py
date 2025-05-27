from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    review_1 = Review(product_id=1, user_id=1, review='A scotch that’s how it is meant to be',
                      stars=1)
    review_2 = Review(product_id=1, user_id=2, review='Smooth. Fast shipping. Excellent all around thanks.',
                      stars=2)
    review_3 = Review(product_id=2, user_id=2, review='Quality product, very happy with my order',
                      stars=5)
    review_4 = Review(product_id=2, user_id=3, review='Perfect fit, true to size. Will buy again!',
                      stars=5)
    review_5 = Review(product_id=3, user_id=3, review='Fake rolex but matches the price lol',
                      stars=4)
    review_6 = Review(product_id=3, user_id=4, review='No one will ever know :)',
                      stars=1)
    review_7 = Review(product_id=4, user_id=4, review='Excellent cutting board, just what I needed',
                      stars=5)
    review_8 = Review(product_id=4, user_id=5, review='Smaller than I thought, looks solid though',
                      stars=5)
    review_9 = Review(product_id=5, user_id=5, review='Love it, fun, custom made to your needs',
                      stars=5)
    review_10 = Review(product_id=5, user_id=5, review="Great light, well made, can't complain",
                       stars=3)

    db.session.add(review_1)
    db.session.add(review_2)
    db.session.add(review_3)
    db.session.add(review_4)
    db.session.add(review_5)
    db.session.add(review_6)
    db.session.add(review_7)
    db.session.add(review_8)
    db.session.add(review_9)
    db.session.add(review_10)
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()

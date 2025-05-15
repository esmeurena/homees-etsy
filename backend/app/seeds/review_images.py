from app.models import db, ReviewImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_review_images():
    review_image_1 = ReviewImage(review_id=1, url='url_1.com')
    review_image_2 = ReviewImage(review_id=2, url='url_2.com')
    review_image_3 = ReviewImage(review_id=3, url='url_3.com')
    review_image_4 = ReviewImage(review_id=4, url='url_4.com')
    review_image_5 = ReviewImage(review_id=5, url='url_5.com')

    db.session.add(review_image_1)
    db.session.add(review_image_2)
    db.session.add(review_image_3)
    db.session.add(review_image_4)
    db.session.add(review_image_5)
    db.session.commit()

def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM review_images"))

    db.session.commit()

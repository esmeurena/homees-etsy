from app.models import db, ReviewImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_review_images():
    review_image_1 = ReviewImage(owner_id=1, name='name_1', price=5,
                        description='a description', item_count='5')
    review_image_2 = ReviewImage(owner_id=2, name='name_2', price=10,
                        description='a description', item_count='10')
    review_image_3 = ReviewImage(owner_id=3, name='name_3', price=15,
                        description='a description', item_count='15')
    review_image_4 = ReviewImage(owner_id=4, name='name_4', price=20,
                        description='a description', item_count='20')
    review_image_5 = ReviewImage(owner_id=5, name='name_5', price=25,
                        description='a description', item_count='25')

    db.session.add(review_image_1)
    db.session.add(review_image_2)
    db.session.add(review_image_3)
    db.session.add(review_image_4)
    db.session.add(review_image_5)
    db.session.commit()

def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviewImages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviewImages"))

    db.session.commit()

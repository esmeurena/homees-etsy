from app.models import db, ReviewImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_review_images():
    review_image_1 = ReviewImage(review_id=1, url='https://www.totalwine.com/dynamic/x220,sq/images/219521750/219521750-1-fr.png')
    review_image_2 = ReviewImage(review_id=2, url='https://i.etsystatic.com/7598396/r/il/8bc1dd/574974750/il_fullxfull.574974750_hrfd.jpg')
    review_image_3 = ReviewImage(review_id=3, url='https://m.media-amazon.com/images/I/81e222yvh7L._AC_SL1500_.jpg')
    review_image_4 = ReviewImage(review_id=4, url='https://m.media-amazon.com/images/I/71Yx9Bj6b0L._AC_SL1500_.jpg')
    review_image_5 = ReviewImage(review_id=5, url='https://m.media-amazon.com/images/I/81sM980QyVL._AC_SL1500_.jpg')

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
